import React, { useState, useEffect, useRef, useCallback } from 'react';
import { InterviewQuestion, Field, InterviewMode, AnswerFeedback } from '../../types';
import { speechService } from '../../lib/speech-service';
import { evaluateInterviewAnswer, generateNaturalHRResponse } from '../../lib/feedback-engine';
import { 
  Camera, CameraOff, Mic, MicOff, Volume2, VolumeX, 
  RotateCcw, Sparkles, Lightbulb, PhoneOff, 
  Keyboard, Send, X, ArrowRight, UserCheck, CheckCircle2
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
        setCameraError('Kamera atau mikrofon belum diizinkan. Anda tetap dapat melanjutkan simulasi.');
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

        // Auto Turn-Taking via silence detection: if user has spoken something and pauses for 3 seconds
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }
        silenceTimerRef.current = setTimeout(() => {
          const currentTotal = (candidateTranscriptRef.current + ' ' + finalT + ' ' + interimT).trim();
          if (flowStateRef.current === 'candidate_turn' && currentTotal.length >= 15) {
            handleCandidateFinishSpeaking(currentTotal);
          }
        }, 3000);
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
      // If muted, switch to candidate turn after 2 seconds
      setTimeout(() => {
        startCandidateListening();
      }, 2000);
      return;
    }

    speechService.speak(textToSpeak, {
      rate: 0.95,
      onStart: () => setFlowState('speaking_question'),
      onEnd: () => {
        // AI finished asking the question -> Candidate's turn immediately starts!
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

    // Ibu Sarah speaks the acknowledgment naturally
    if (!isAiMuted) {
      speechService.speak(naturalResponse, {
        rate: 0.95,
        onStart: () => setFlowState('speaking_feedback'),
        onEnd: () => {
          // Immediately after Ibu Sarah finishes speaking the response, advance to next question!
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

  // Skip AI speech if user wants to answer immediately
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

  return (
    <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between space-y-4">
      {/* 1. Header Bar: Meeting Info & Stepper */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-4.5 shadow-lg border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Recruiter Identity & Field */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" title="Online" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-white tracking-tight">Ruang Wawancara Tatap Muka AI</span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {field.shortName}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Pewawancara: <span className="text-slate-200 font-medium">Ibu Sarah Pratama (Talent Acquisition)</span>
            </p>
          </div>
        </div>

        {/* Stepper Progress & Meeting Clock */}
        <div className="flex items-center gap-3">
          {/* Question Stepper Dots */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs">
            <span className="text-slate-400 mr-1">Soal:</span>
            {Array.from({ length: totalQuestions }).map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-blue-500 scale-125 ring-2 ring-blue-400/40'
                    : idx < currentIndex
                    ? 'bg-emerald-500'
                    : 'bg-slate-700'
                }`}
                title={`Pertanyaan ${idx + 1}`}
              />
            ))}
            <span className="font-bold text-slate-200 ml-1.5">{currentIndex + 1}/{totalQuestions}</span>
          </div>

          {/* REC Timer */}
          <div className="bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700/80 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="font-mono font-bold text-xs sm:text-sm text-slate-100">
              {mode === 'timed' ? formatTime(timeLeft) : formatTime(recordingSeconds)}
            </span>
          </div>

          {/* AI Sound Toggle */}
          <button
            onClick={() => {
              const next = !isAiMuted;
              setIsAiMuted(next);
              if (next) speechService.stop();
            }}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              isAiMuted 
                ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white' 
                : 'bg-blue-600/20 text-blue-400 border-blue-500/40 hover:bg-blue-600/30'
            }`}
            title={isAiMuted ? 'Aktifkan Suara Audio AI' : 'Bisukan Suara Audio AI'}
          >
            {isAiMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. Main Stage: Split Video Tiles (Google Meet / Zoom Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch flex-1 min-h-[440px] sm:min-h-[480px]">
        
        {/* TILE 1: AI INTERVIEWER (Ibu Sarah Pratama) */}
        <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 rounded-2xl border border-slate-700/80 p-5 flex flex-col justify-between relative overflow-hidden shadow-xl min-h-[360px] sm:min-h-[420px]">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-radial from-blue-900/15 via-transparent to-black/50 pointer-events-none" />

          {/* Header inside AI Feed */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 text-xs">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="font-semibold text-slate-200">Ibu Sarah (AI Recruiter)</span>
            </div>

            {/* Dynamic Status Pill */}
            <div className="flex items-center gap-2">
              {flowState === 'speaking_question' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 animate-pulse">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Membacakan Pertanyaan...</span>
                </span>
              )}
              {flowState === 'candidate_turn' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Menyimak Jawaban Anda</span>
                </span>
              )}
              {flowState === 'speaking_feedback' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Merespons Lisan...</span>
                </span>
              )}
            </div>
          </div>

          {/* AI Avatar Centerpiece with Speaking Ripple */}
          <div className="my-auto py-4 flex flex-col items-center justify-center relative z-10 text-center">
            <div className="relative">
              {/* Ripple wave when AI is speaking */}
              {(flowState === 'speaking_question' || flowState === 'speaking_feedback') && (
                <>
                  <div className="absolute -inset-4 rounded-full bg-blue-500/20 animate-ping" />
                  <div className="absolute -inset-8 rounded-full bg-blue-500/10 animate-pulse" />
                </>
              )}

              {/* Avatar Photo */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 shadow-2xl relative">
                <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center border-2 border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
                    alt="Ibu Sarah AI"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="text-white text-3xl font-black">SP</div>
                </div>
              </div>

              {/* Speaking Equalizer Badge */}
              {(flowState === 'speaking_question' || flowState === 'speaking_feedback') && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-blue-500/40 flex items-center gap-1 shadow-md">
                  <span className="w-1 h-3 bg-blue-400 rounded-full animate-bounce" />
                  <span className="w-1 h-5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                  <span className="w-1 h-4 bg-blue-400 rounded-full animate-bounce [animation-delay:0.45s]" />
                </div>
              )}
            </div>

            <div className="mt-4">
              <h4 className="text-white font-bold text-base">Ibu Sarah Pratama</h4>
              <p className="text-xs text-slate-400">Head of Talent Acquisition & Vocational Assessor</p>
            </div>
          </div>

          {/* Bottom Live Caption of what Ibu Sarah says */}
          <div className="relative z-10 bg-slate-950/90 backdrop-blur-md rounded-xl p-4 border border-slate-700/80 space-y-1.5 shadow-md">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-blue-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                {flowState === 'speaking_feedback' ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Tanggapan Lisan Pewawancara:</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Pertanyaan #{currentIndex + 1}:</span>
                  </>
                )}
              </span>

              <div className="flex items-center gap-2">
                {flowState === 'speaking_question' && (
                  <button
                    onClick={handleSkipAiSpeech}
                    className="text-[11px] text-blue-300 hover:text-white underline cursor-pointer"
                    title="Lewati pembacaan suara dan langsung mulai menjawab"
                  >
                    Lewati Suara & Mulai Bicara
                  </button>
                )}
                <button
                  onClick={handleRepeatQuestion}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded-md border border-slate-600 transition cursor-pointer"
                  title="Dengarkan Ulang Pertanyaan"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Ulang Suara</span>
                </button>
              </div>
            </div>

            <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
              {flowState === 'speaking_feedback' ? aiSpokenCaption : question.question}
            </p>

            {/* Recruiter Context Tips Accordion */}
            <div className="pt-1 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setShowTips(!showTips)}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showTips ? 'Tutup Petunjuk' : 'Tips Rekruter'}</span>
              </button>
              <span className="text-[11px] text-slate-500">Kompetensi: {question.evaluatedCompetency}</span>
            </div>

            {showTips && (
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs mt-1.5 leading-relaxed">
                <strong>Tips Wawancara:</strong> {question.contextTips}
              </div>
            )}
          </div>
        </div>

        {/* TILE 2: CANDIDATE LIVE FEED (Webcam & Live Karaoke Subtitles) */}
        <div className="bg-slate-900 rounded-2xl border border-slate-700/80 flex flex-col justify-between relative overflow-hidden shadow-xl min-h-[360px] sm:min-h-[420px]">
          
          {/* Top Overlays on Candidate Video */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            {/* Blinking LIVE REC Badge */}
            <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
              <span className="font-bold tracking-wider text-rose-400">REC</span>
              <span className="font-mono text-slate-300 font-semibold">{formatTime(recordingSeconds)}</span>
            </div>

            {/* Turn status indicator */}
            <div className="bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-white">
              {flowState === 'candidate_turn' ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Giliran Anda Berbicara
                </span>
              ) : (
                <span className="text-slate-400">Menunggu AI...</span>
              )}
            </div>
          </div>

          {/* Actual Video Element or Fallback */}
          <div className="relative w-full h-full flex items-center justify-center flex-1 min-h-[300px] bg-slate-950">
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
                <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-300 text-2xl font-bold">
                  Siswa
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">Kamera Dinonaktifkan</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    {cameraError || 'Anda dapat mengaktifkan kamera dengan tombol kamera di bar kontrol.'}
                  </p>
                </div>
              </div>
            )}

            {/* Live Audio Visualizer Pill (Bottom Left of Camera) */}
            <div className="absolute bottom-20 left-4 z-20 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <Mic className={`w-3.5 h-3.5 ${audioLevel > 15 ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`} />
              <div className="flex items-center gap-1 h-3">
                {[1, 2, 3, 4, 5].map((bar) => {
                  const threshold = bar * 18;
                  const isActive = audioLevel >= threshold;
                  return (
                    <div
                      key={bar}
                      className={`w-1 rounded-full transition-all duration-75 ${
                        isActive ? 'bg-emerald-400 h-full' : 'bg-slate-700 h-1.5'
                      }`}
                    />
                  );
                })}
              </div>
              <span className="text-[10px] font-bold text-slate-300 uppercase">
                {audioLevel > 15 ? 'Suara Masuk' : 'Mic Aktif'}
              </span>
            </div>

            {/* Candidate Name Tag */}
            <div className="absolute bottom-20 right-4 z-20 bg-black/75 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs font-semibold text-white">
              Kandidat Peserta Vokasi
            </div>

            {/* 3. Live Subtitles / Caption Overlay for Candidate's Speech */}
            <div className="absolute bottom-3 left-3 right-3 z-25 bg-slate-950/85 backdrop-blur-md rounded-xl p-3 border border-white/15 text-left transition-all">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <Mic className="w-3 h-3" />
                  <span>Transkripsi Lisan Anda (Live Caption):</span>
                </span>
                {displayedCandidateText.length > 0 && (
                  <span className="text-slate-400">{displayedCandidateText.split(' ').length} kata</span>
                )}
              </div>

              <p className="text-white text-xs sm:text-sm leading-relaxed min-h-[38px] max-h-[56px] overflow-y-auto">
                {displayedCandidateText ? (
                  <>
                    <span>{candidateTranscript}</span>
                    {interimTranscript && (
                      <span className="text-blue-300 italic"> {interimTranscript}</span>
                    )}
                  </>
                ) : flowState === 'candidate_turn' ? (
                  <span className="text-slate-400 italic">
                    Silakan mulai berbicara langsung ke mikrofon... Suara Anda akan otomatis tertranskripsikan di sini.
                  </span>
                ) : (
                  <span className="text-slate-500 italic">
                    Menunggu giliran menjawab...
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Floating Meeting Control Bar (Google Meet Style) */}
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        {/* Left Side: Camera & Mic Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleCamera}
            className={`p-3 rounded-xl transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
              cameraActive ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white shadow-md'
            }`}
            title={cameraActive ? 'Matikan Kamera' : 'Nyalakan Kamera'}
          >
            {cameraActive ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
            <span className="hidden sm:inline">{cameraActive ? 'Kamera Aktif' : 'Kamera Mati'}</span>
          </button>

          <button
            onClick={toggleMic}
            className={`p-3 rounded-xl transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
              micActive ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white shadow-md'
            }`}
            title={micActive ? 'Matikan Mikrofon' : 'Nyalakan Mikrofon'}
          >
            {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            <span className="hidden sm:inline">{micActive ? 'Mic Aktif' : 'Mic Bisu'}</span>
          </button>

          {/* Emergency Text Drawer Trigger */}
          <button
            onClick={() => setShowTextDrawer(!showTextDrawer)}
            className={`p-3 rounded-xl transition cursor-pointer text-xs font-semibold flex items-center gap-1.5 ${
              showTextDrawer ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
            title="Ketik manual jika mic bermasalah"
          >
            <Keyboard className="w-4 h-4" />
            <span className="hidden md:inline">Ketik Manual</span>
          </button>
        </div>

        {/* Center: Main Dynamic Action Button */}
        <div className="flex items-center gap-2 flex-1 sm:flex-initial justify-center">
          {flowState === 'candidate_turn' ? (
            <button
              onClick={() => handleCandidateFinishSpeaking()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition cursor-pointer active:scale-95 animate-pulse"
            >
              <Mic className="w-4 h-4" />
              <span>Selesai Menjawab (AI Langsung Merespons)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : flowState === 'speaking_question' ? (
            <div className="flex items-center gap-2 text-xs text-blue-300 bg-blue-500/10 px-4 py-2.5 rounded-xl border border-blue-500/20">
              <Volume2 className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>Ibu Sarah membacakan pertanyaan...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-purple-300 bg-purple-500/10 px-4 py-2.5 rounded-xl border border-purple-500/20">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>Ibu Sarah menanggapi & menyambung otomatis...</span>
            </div>
          )}
        </div>

        {/* Right Side: End Call Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            className="p-3 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white transition border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            title="Keluar dari sesi wawancara"
          >
            <PhoneOff className="w-4 h-4" />
            <span className="hidden sm:inline">Tinggalkan Sesi</span>
          </button>
        </div>
      </div>

      {/* 5. Emergency Text Drawer (Slide-up modal when user clicks 'Ketik Manual') */}
      {showTextDrawer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-sm">Mode Jawaban Teks Darurat</h3>
              </div>
              <button
                onClick={() => setShowTextDrawer(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Gunakan opsi ini hanya jika mikrofon Anda tidak berfungsi atau berada di tempat bising.
            </p>

            <textarea
              rows={4}
              value={manualText || candidateTranscript}
              onChange={(e) => {
                setManualText(e.target.value);
                setCandidateTranscript(e.target.value);
              }}
              placeholder="Ketikkan jawaban Anda di sini..."
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-blue-500 transition resize-none"
            />

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowTextDrawer(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition"
              >
                Tutup
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
                <span>Kirim & Dengarkan Tanggapan AI</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
