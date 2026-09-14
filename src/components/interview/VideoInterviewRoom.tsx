import React, { useState, useEffect, useRef, useCallback } from 'react';
import { InterviewQuestion, Field, InterviewMode } from '../../types';
import { speechService } from '../../lib/speech-service';
import { evaluateInterviewAnswer, generateNaturalHRResponse } from '../../lib/feedback-engine';
import { 
  Camera, CameraOff, Mic, MicOff, Volume2, VolumeX, 
  RotateCcw, Lightbulb, PhoneOff, 
  Keyboard, Send, X, ArrowRight, UserCheck, CheckCircle2,
  MessageSquareQuote, Video as VideoIcon, Check
} from 'lucide-react';

interface VideoInterviewRoomProps {
  question: InterviewQuestion;
  field: Field;
  currentIndex: number;
  totalQuestions: number;
  mode?: InterviewMode;
  timerDurationSeconds?: number;
  onSubmitAnswer: (answer: string, timeSpentSeconds?: number) => void;
  onCancel: () => void;
}

export const VideoInterviewRoom: React.FC<VideoInterviewRoomProps> = ({
  question,
  field,
  currentIndex,
  totalQuestions,
  mode = 'timed',
  timerDurationSeconds = 120,
  onSubmitAnswer,
  onCancel,
}) => {
  // Video & Stream states
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(true);
  const [micActive, setMicActive] = useState<boolean>(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState<number>(0);

  // Audio Context & Analyser for Mic Visualizer
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Flow State: 'speaking_question' -> 'candidate_turn' -> 'speaking_feedback'
  const [flowState, setFlowState] = useState<'speaking_question' | 'candidate_turn' | 'speaking_feedback'>('speaking_question');
  const [isAiMuted, setIsAiMuted] = useState<boolean>(false);
  const [aiSpokenCaption, setAiSpokenCaption] = useState<string>('');
  
  // Candidate Speech Recognition States
  const [candidateTranscript, setCandidateTranscript] = useState<string>('');
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Emergency Text Drawer (Optional fallback if user prefers typing or mic broken)
  const [showTextDrawer, setShowTextDrawer] = useState<boolean>(false);
  const [manualText, setManualText] = useState<string>('');

  // Timers
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(timerDurationSeconds);
  const [showTips, setShowTips] = useState<boolean>(false);

  // Keep refs for callbacks
  const flowStateRef = useRef(flowState);
  flowStateRef.current = flowState;

  const candidateTranscriptRef = useRef(candidateTranscript);
  candidateTranscriptRef.current = candidateTranscript;

  const isLastQuestion = currentIndex + 1 >= totalQuestions;

  // 1. Initialize Webcam & Microphone
  useEffect(() => {
    let currentStream: MediaStream | null = null;

    const startMedia = async () => {
      try {
        setCameraError(null);
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
          audio: true,
        });

        currentStream = mediaStream;
        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        // Setup real-time Audio Analyser for candidate speech visualizer
        try {
          const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioCtx) {
            const ctx = new AudioCtx();
            audioContextRef.current = ctx;
            const source = ctx.createMediaStreamSource(mediaStream);
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 64;
            source.connect(analyser);
            analyserRef.current = analyser;

            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            const updateLevel = () => {
              if (analyserRef.current) {
                analyserRef.current.getByteFrequencyData(dataArray);
                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) {
                  sum += dataArray[i];
                }
                const avg = sum / dataArray.length;
                setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
              }
              animFrameRef.current = requestAnimationFrame(updateLevel);
            };
            updateLevel();
          }
        } catch (audioErr) {
          console.warn('AudioContext setup error:', audioErr);
        }
      } catch (err: any) {
        console.warn('Webcam/Mic access error:', err);
        setCameraError('Kamera atau mikrofon belum diizinkan. Anda tetap dapat melanjutkan simulasi wawancara.');
        setCameraActive(false);
      }
    };

    startMedia();

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Update video element when stream changes
  useEffect(() => {
    if (videoRef.current && stream && cameraActive) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, cameraActive]);

  // Toggle Camera
  const toggleCamera = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setCameraActive(videoTrack.enabled);
      }
    } else {
      setCameraActive(!cameraActive);
    }
  };

  // Toggle Microphone
  const toggleMic = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMicActive(audioTrack.enabled);
      }
    } else {
      setMicActive(!micActive);
    }
  };

  // 2. Setup Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'id-ID';

      recognition.onresult = (event: any) => {
        let finalT = '';
        let interimT = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const t = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalT += t + ' ';
          } else {
            interimT += t;
          }
        }

        if (finalT) {
          setCandidateTranscript(prev => (prev ? prev + ' ' : '') + finalT.trim());
        }
        setInterimTranscript(interimT);

        // Auto Turn-Taking via silence detection: if user has spoken something and pauses for 3.5 seconds
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }
        silenceTimerRef.current = setTimeout(() => {
          const currentTotal = (candidateTranscriptRef.current + ' ' + finalT + ' ' + interimT).trim();
          if (flowStateRef.current === 'candidate_turn' && currentTotal.length >= 15) {
            handleCandidateFinishSpeaking(currentTotal);
          }
        }, 3500);
      };

      recognition.onerror = () => {
        // graceful handle
      };

      recognition.onend = () => {
        // Auto restart if still in candidate turn and mic is active
        if (flowStateRef.current === 'candidate_turn' && micActive) {
          try {
            recognition.start();
          } catch {}
        }
      };

      recognitionRef.current = recognition;
    }
  }, [micActive]);

  // Start Candidate Listening
  const startCandidateListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch {}
    }
    setFlowState('candidate_turn');
  }, []);

  // Stop Candidate Listening
  const stopCandidateListening = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
  }, []);

  // 3. Question Auto-Speech
  const playQuestionSpeech = useCallback((textToSpeak: string) => {
    setAiSpokenCaption(textToSpeak);
    setFlowState('speaking_question');
    stopCandidateListening();

    if (isAiMuted) {
      // If muted, switch to candidate turn after brief 2 seconds
      setTimeout(() => {
        startCandidateListening();
      }, 2000);
      return;
    }

    speechService.speak(textToSpeak, {
      rate: 0.95,
      onStart: () => setFlowState('speaking_question'),
      onEnd: () => {
        // Recruiter finished asking question -> Candidate's turn immediately starts!
        startCandidateListening();
      },
      onError: () => {
        startCandidateListening();
      }
    });
  }, [isAiMuted, startCandidateListening, stopCandidateListening]);

  // When question changes, reset & speak question
  useEffect(() => {
    setCandidateTranscript('');
    setInterimTranscript('');
    setManualText('');
    setRecordingSeconds(0);
    setTimeLeft(timerDurationSeconds);
    setShowTextDrawer(false);

    const timer = setTimeout(() => {
      playQuestionSpeech(question.question);
    }, 600);

    return () => {
      clearTimeout(timer);
      speechService.stop();
      stopCandidateListening();
    };
  }, [question.id, playQuestionSpeech, stopCandidateListening, timerDurationSeconds]);

  // 4. Timers (recording seconds & countdown)
  useEffect(() => {
    const interval = setInterval(() => {
      setRecordingSeconds(prev => prev + 1);
      if (mode === 'timed') {
        setTimeLeft(prev => {
          if (prev <= 1 && flowState === 'candidate_turn') {
            // Auto submit when time is up
            handleCandidateFinishSpeaking();
            return 0;
          }
          return Math.max(0, prev - 1);
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [flowState, mode]);

  // Format seconds mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 5. Candidate Finishes Speaking -> Natural Recruiter Response -> Auto Bridge to Next Question
  const handleCandidateFinishSpeaking = (overrideText?: string) => {
    stopCandidateListening();

    const finalText = (overrideText || candidateTranscript || manualText).trim();
    const answerToEvaluate = finalText.length > 0 ? finalText : 'Kandidat telah memberikan tanggapan lisan.';

    // Evaluate silently in background (saves score, strengths, and suggestions for final report)
    const feedback = evaluateInterviewAnswer(question, answerToEvaluate);

    // Generate natural HR recruiter conversational acknowledgment (WITHOUT mentioning scores!)
    const naturalResponse = generateNaturalHRResponse(
      question,
      feedback,
      isLastQuestion,
      currentIndex + 1
    );

    setAiSpokenCaption(naturalResponse);
    setFlowState('speaking_feedback');

    // Sarah speaks the acknowledgment naturally
    if (!isAiMuted) {
      speechService.speak(naturalResponse, {
        rate: 0.95,
        onStart: () => setFlowState('speaking_feedback'),
        onEnd: () => {
          // Immediately after Sarah finishes speaking response, advance to next question!
          proceedToNextQuestion(answerToEvaluate);
        },
        onError: () => {
          proceedToNextQuestion(answerToEvaluate);
        },
      });
    } else {
      // If muted, wait brief 2.5s then auto proceed
      setTimeout(() => {
        proceedToNextQuestion(answerToEvaluate);
      }, 2500);
    }
  };

  // Submit and trigger next question in useInterviewSession
  const proceedToNextQuestion = (answerText: string) => {
    speechService.stop();
    const timeSpent = Math.max(1, recordingSeconds);
    onSubmitAnswer(answerText, timeSpent);
  };

  // Skip speaking if user wants to answer immediately
  const handleSkipAiSpeech = () => {
    speechService.stop();
    if (flowState === 'speaking_question') {
      startCandidateListening();
    } else if (flowState === 'speaking_feedback') {
      const finalText = (candidateTranscript || manualText || 'Tanggapan lisan kandidat.').trim();
      proceedToNextQuestion(finalText);
    }
  };

  // Re-read question aloud
  const handleRepeatQuestion = () => {
    playQuestionSpeech(question.question);
  };

  const displayedCandidateText = (candidateTranscript + ' ' + interimTranscript).trim();

  // Active speaker conditions
  const isInterviewerSpeaking = flowState === 'speaking_question' || flowState === 'speaking_feedback';
  const isCandidateSpeaking = flowState === 'candidate_turn' && audioLevel > 15;

  return (
    <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between space-y-3">
      {/* 1. Header Bar: Meeting Info & Progress */}
      <div className="bg-white text-slate-800 rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-xs border border-slate-200/90 flex flex-wrap items-center justify-between gap-3">
        {/* Recruiter & Meeting Room Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center font-bold text-blue-600">
            <VideoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-slate-900 tracking-tight">
                Ruang Wawancara Video
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {field.name}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Pewawancara: <span className="text-slate-800 font-semibold">Sarah Pratama, S.Psi.</span> (Talent Acquisition)
            </p>
          </div>
        </div>

        {/* Meeting Status, Clock & Sound */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Question Stepper Dots */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600">
            <span className="text-slate-400 mr-1">Pertanyaan:</span>
            {Array.from({ length: totalQuestions }).map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-blue-600 scale-125 ring-2 ring-blue-400/40'
                    : idx < currentIndex
                    ? 'bg-emerald-500'
                    : 'bg-slate-200'
                }`}
                title={`Pertanyaan ${idx + 1}`}
              />
            ))}
            <span className="font-bold text-slate-700 ml-1.5">{currentIndex + 1}/{totalQuestions}</span>
          </div>

          {/* REC Timer */}
          <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-mono font-bold text-xs sm:text-sm text-slate-700">
              {mode === 'timed' ? formatTime(timeLeft) : formatTime(recordingSeconds)}
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              const next = !isAiMuted;
              setIsAiMuted(next);
              if (next) speechService.stop();
            }}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              isAiMuted 
                ? 'bg-slate-100 text-slate-400 border-slate-200 hover:text-slate-700' 
                : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
            }`}
            title={isAiMuted ? 'Nyalakan Suara Pewawancara' : 'Bisukan Suara Pewawancara'}
          >
            {isAiMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. Main Stage: Virtual Video Conference Tiles (Google Meet / Zoom Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 items-stretch flex-1 min-h-[300px] sm:min-h-[340px]">
        
        {/* TILE 1: PEWAWANCARA (Sarah Pratama - Professional Recruiter Meeting Presence) */}
        <div 
          className={`bg-slate-900 rounded-2xl border transition-all duration-300 relative overflow-hidden shadow-md flex flex-col justify-between min-h-[280px] sm:min-h-[350px] ${
            isInterviewerSpeaking 
              ? 'border-blue-500/80 ring-2 ring-blue-500/25' 
              : 'border-slate-800'
          }`}
        >
          {/* Top Status Overlays on Interviewer Feed */}
          <div className="relative z-10 p-3.5 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs">
              <span className={`w-2 h-2 rounded-full ${isInterviewerSpeaking ? 'bg-blue-400 animate-pulse' : 'bg-emerald-400'}`} />
              <span className="font-semibold text-white">Sarah Pratama</span>
              <span className="text-slate-400 text-[11px] hidden sm:inline">• Pewawancara</span>
            </div>

            {/* Dynamic Status Pill */}
            <div>
              {flowState === 'speaking_question' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/90 text-white border border-blue-400/30 shadow-xs">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>Membacakan Pertanyaan...</span>
                </span>
              )}
              {flowState === 'candidate_turn' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-md text-slate-300 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Menyimak Tanggapan Anda</span>
                </span>
              )}
              {flowState === 'speaking_feedback' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600/90 text-white border border-indigo-400/30 shadow-xs">
                  <MessageSquareQuote className="w-3.5 h-3.5 animate-pulse" />
                  <span>Memberikan Tanggapan...</span>
                </span>
              )}
            </div>
          </div>

          {/* Center Stage: Authentic Recruiter Profile & Natural Audio Equalizer */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto py-3 text-center space-y-3">
            {/* Recruiter Avatar Monogram */}
            <div className="relative">
              <div className={`w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 border-2 border-slate-600 flex items-center justify-center font-bold text-2xl text-slate-200 shadow-md transition-all ${
                isInterviewerSpeaking ? 'ring-4 ring-blue-500/30' : ''
              }`}>
                SP
              </div>
              <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
                isInterviewerSpeaking ? 'bg-blue-400 animate-pulse' : 'bg-emerald-500'
              }`} />
            </div>

            {/* Recruiter Identity */}
            <div>
              <h4 className="text-white font-bold text-base sm:text-lg">Sarah Pratama, S.Psi.</h4>
              <p className="text-xs text-slate-400 mt-0.5">Head of Talent Acquisition & Asesor Kejuruan</p>
            </div>

            {/* Natural Audio Frequency Waveform (7 smooth bars, no neon glowing halos) */}
            <div className="flex items-center justify-center gap-1.5 h-10 mt-1">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <span
                  key={num}
                  className={`w-1.5 rounded-full transition-all duration-200 ${
                    isInterviewerSpeaking
                      ? `bg-blue-400 animate-eq-${num}`
                      : 'h-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>

            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-[11px] text-slate-300">
              <Mic className={`w-3 h-3 ${isInterviewerSpeaking ? 'text-blue-400' : 'text-slate-400'}`} />
              <span>{isInterviewerSpeaking ? 'Pewawancara sedang berbicara...' : 'Pewawancara sedang menyimak'}</span>
            </div>
          </div>

          {/* Bottom Overlay: Interviewer Nameplate & Speaking Caption */}
          <div className="relative z-10 p-3.5 sm:p-4 space-y-2">
            {/* Live speech caption when Sarah is speaking feedback */}
            {flowState === 'speaking_feedback' && aiSpokenCaption && (
              <div className="bg-black/80 backdrop-blur-md border border-white/15 rounded-xl p-3 text-xs sm:text-sm text-slate-100 shadow-md animate-in fade-in duration-200">
                <span className="text-blue-400 font-semibold block text-[11px] uppercase tracking-wider mb-0.5">
                  Tanggapan Pewawancara:
                </span>
                <p className="leading-relaxed italic">"{aiSpokenCaption}"</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              {/* Google Meet / Zoom style name badge */}
              <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 text-xs">
                {isInterviewerSpeaking ? (
                  <div className="flex items-center gap-0.5 text-blue-400">
                    <span className="w-1 h-3 bg-blue-400 rounded-full animate-bounce" />
                    <span className="w-1 h-4 bg-blue-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                ) : (
                  <Mic className="w-3.5 h-3.5 text-slate-400" />
                )}
                <div>
                  <span className="font-semibold text-white">Sarah Pratama, S.Psi.</span>
                  <span className="text-[11px] text-slate-400 block sm:inline sm:ml-1.5">Talent Acquisition & Asesor</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 bg-black/40 backdrop-blur-md px-2 py-1 rounded border border-white/10 hidden sm:block">
                Audio Interaktif
              </div>
            </div>
          </div>
        </div>

        {/* TILE 2: KANDIDAT (Webcam Feed & Live Subtitles) */}
        <div 
          className={`bg-slate-900 rounded-2xl border transition-all duration-300 relative overflow-hidden shadow-md flex flex-col justify-between min-h-[280px] sm:min-h-[350px] ${
            isCandidateSpeaking 
              ? 'border-emerald-500/80 ring-2 ring-emerald-500/25' 
              : 'border-slate-800'
          }`}
        >
          {/* Top Overlays on Candidate Video */}
          <div className="absolute top-3.5 left-3.5 right-3.5 sm:top-4 sm:left-4 sm:right-4 z-20 flex items-center justify-between pointer-events-none">
            {/* Live REC indicator */}
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-white">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-semibold text-rose-300 text-[11px] tracking-wider">REC</span>
              <span className="font-mono text-slate-300 text-[11px]">{formatTime(recordingSeconds)}</span>
            </div>

            {/* Turn status indicator */}
            <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-white">
              {flowState === 'candidate_turn' ? (
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Giliran Anda Berbicara
                </span>
              ) : (
                <span className="text-slate-400">Menyimak Pewawancara...</span>
              )}
            </div>
          </div>

          {/* Actual Video Element or Clean Fallback */}
          <div className="relative w-full h-full flex items-center justify-center flex-1 bg-slate-950">
            {cameraActive && !cameraError ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover -scale-x-100"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center text-slate-400 space-y-3">
                <div className="w-20 h-20 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 text-xl font-bold">
                  Kandidat
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">Kamera Dinonaktifkan</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    {cameraError || 'Kamera Anda nonaktif. Anda dapat mengaktifkannya melalui bar kontrol di bawah.'}
                  </p>
                </div>
              </div>
            )}

            {/* Overlay Gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/30 pointer-events-none" />

            {/* Google Meet / Zoom style Closed Captions (Live Subtitles) */}
            <div className="absolute bottom-14 left-3 right-3 sm:bottom-14 sm:left-4 sm:right-4 z-20 bg-black/80 backdrop-blur-md rounded-xl px-3.5 py-2.5 border border-white/15 text-left transition-all">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <Mic className="w-3 h-3" />
                  <span>Transkripsi Lisan Langsung:</span>
                </span>
                {displayedCandidateText.length > 0 && (
                  <span className="text-slate-400 font-mono text-[10px]">{displayedCandidateText.split(' ').length} kata</span>
                )}
              </div>

              <p className="text-white text-xs sm:text-sm leading-relaxed min-h-[28px] max-h-[50px] overflow-y-auto">
                {displayedCandidateText ? (
                  <>
                    <span>{candidateTranscript}</span>
                    {interimTranscript && (
                      <span className="text-emerald-300 font-normal"> {interimTranscript}</span>
                    )}
                  </>
                ) : flowState === 'candidate_turn' ? (
                  <span className="text-slate-400 italic">
                    Silakan mulai berbicara langsung ke mikrofon... Suara Anda akan otomatis tertranskripsikan di sini.
                  </span>
                ) : (
                  <span className="text-slate-500 italic">
                    Menyimak pewawancara...
                  </span>
                )}
              </p>
            </div>

            {/* Bottom-left Nameplate for Candidate */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white">
              <div className="flex items-center gap-1">
                <Mic className={`w-3.5 h-3.5 ${audioLevel > 15 ? 'text-emerald-400' : 'text-slate-400'}`} />
                <div className="flex items-center gap-0.5 h-2.5">
                  {[1, 2, 3].map((bar) => (
                    <div
                      key={bar}
                      className={`w-0.5 rounded-full transition-all duration-75 ${
                        audioLevel >= bar * 25 ? 'bg-emerald-400 h-full' : 'bg-slate-600 h-1'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="font-semibold text-slate-200">Anda (Kandidat Seleksi)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Question & Assessment Guide Banner (Clean White Card) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-2.5 text-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-blue-700 uppercase tracking-wider text-[11px] px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Pertanyaan {currentIndex + 1} dari {totalQuestions}</span>
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 text-[11px]">
              Kompetensi: <strong className="text-slate-900 font-semibold">{question.evaluatedCompetency}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {flowState === 'speaking_question' && (
              <button
                onClick={handleSkipAiSpeech}
                className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold transition cursor-pointer"
                title="Lewati pembacaan suara dan langsung mulai menjawab"
              >
                Mulai Menjawab Sekarang
              </button>
            )}
            <button
              onClick={handleRepeatQuestion}
              className="inline-flex items-center gap-1.5 text-[11px] text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-lg border border-slate-200 font-medium transition cursor-pointer"
              title="Dengarkan Ulang Pertanyaan"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>Dengarkan Ulang</span>
            </button>
          </div>
        </div>

        {/* The Question Text */}
        <p className="text-slate-900 text-base sm:text-lg font-bold leading-relaxed">
          {question.question}
        </p>

        {/* Tips / Panduan Rekruter Accordion */}
        <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowTips(!showTips)}
            className="text-amber-700 hover:text-amber-800 flex items-center gap-1.5 font-semibold transition cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>{showTips ? 'Sembunyikan Panduan Menjawab' : 'Lihat Tips & Panduan Menjawab'}</span>
          </button>
          
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Fokus pada pengalaman konkret, tindakan nyata, dan hasil kerja.
          </span>
        </div>

        {showTips && (
          <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs leading-relaxed mt-1 animate-in fade-in duration-150">
            <strong>Panduan Menjawab:</strong> {question.contextTips}
          </div>
        )}
      </div>

      {/* 4. Video Meeting Control Dock (Clean Floating White Bar) */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-4 py-3 shadow-md flex flex-wrap items-center justify-between gap-3">
        {/* Left: Hardware Controls (Camera, Mic, Manual Text) */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleCamera}
            className={`p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 text-xs font-semibold ${
              cameraActive 
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200' 
                : 'bg-rose-600 text-white shadow-xs'
            }`}
            title={cameraActive ? 'Matikan Kamera' : 'Nyalakan Kamera'}
          >
            {cameraActive ? <Camera className="w-4 h-4 text-slate-600" /> : <CameraOff className="w-4 h-4" />}
            <span className="hidden sm:inline">{cameraActive ? 'Kamera Aktif' : 'Kamera Mati'}</span>
          </button>

          <button
            onClick={toggleMic}
            className={`p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 text-xs font-semibold ${
              micActive 
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200' 
                : 'bg-rose-600 text-white shadow-xs'
            }`}
            title={micActive ? 'Matikan Mikrofon' : 'Nyalakan Mikrofon'}
          >
            {micActive ? <Mic className="w-4 h-4 text-slate-600" /> : <MicOff className="w-4 h-4" />}
            <span className="hidden sm:inline">{micActive ? 'Mic Aktif' : 'Mic Bisu'}</span>
          </button>

          {/* Emergency Text Drawer Trigger */}
          <button
            onClick={() => setShowTextDrawer(!showTextDrawer)}
            className={`p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl transition cursor-pointer text-xs font-semibold flex items-center gap-2 ${
              showTextDrawer 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
            }`}
            title="Ketik jawaban jika mic atau suasana sedang berisik"
          >
            <Keyboard className="w-4 h-4 text-slate-600" />
            <span className="hidden md:inline">Ketik Jawaban</span>
          </button>
        </div>

        {/* Center: Main Primary Action Button */}
        <div className="flex items-center gap-2 flex-1 sm:flex-initial justify-center">
          {flowState === 'candidate_turn' ? (
            <button
              onClick={() => handleCandidateFinishSpeaking()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm transition cursor-pointer active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Selesai Menjawab</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : flowState === 'speaking_question' ? (
            <div className="flex items-center gap-2 text-xs text-slate-700 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
              <Volume2 className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>Pewawancara sedang membacakan pertanyaan...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-slate-700 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
              <MessageSquareQuote className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span>Pewawancara sedang memberikan tanggapan...</span>
            </div>
          )}
        </div>

        {/* Right: End Session Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            className="p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 transition border border-rose-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            title="Keluar dari sesi wawancara"
          >
            <PhoneOff className="w-4 h-4 text-rose-500" />
            <span className="hidden sm:inline">Tinggalkan Sesi</span>
          </button>
        </div>
      </div>

      {/* 5. Emergency Text Drawer (Modal when candidate clicks 'Ketik Jawaban') */}
      {showTextDrawer && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-sm">Mode Jawaban Teks</h3>
              </div>
              <button
                onClick={() => setShowTextDrawer(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Gunakan opsi ini jika mikrofon Anda mengalami kendala teknis atau Anda berada di ruangan yang bising.
            </p>

            <textarea
              rows={4}
              value={manualText || candidateTranscript}
              onChange={(e) => {
                setManualText(e.target.value);
                setCandidateTranscript(e.target.value);
              }}
              placeholder="Tuliskan jawaban lengkap Anda di sini..."
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-blue-500 transition resize-none"
            />

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowTextDrawer(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition cursor-pointer"
              >
                Batal
              </button>

              <button
                type="button"
                disabled={!(manualText || candidateTranscript).trim()}
                onClick={() => {
                  setShowTextDrawer(false);
                  handleCandidateFinishSpeaking(manualText || candidateTranscript);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white transition disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Jawaban</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
