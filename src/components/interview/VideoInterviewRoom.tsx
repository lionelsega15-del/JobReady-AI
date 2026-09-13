import React, { useState, useEffect, useRef, useMemo } from 'react';
import { InterviewQuestion, Field, InterviewMode, AnswerFeedback } from '../../types';
import { speechService } from '../../lib/speech-service';
import { evaluateInterviewAnswer, generateSpokenFeedback, getScoreBadge } from '../../lib/feedback-engine';
import { 
  Camera, CameraOff, Mic, MicOff, Volume2, VolumeX, RotateCcw, 
  ChevronRight, Sparkles, CheckCircle2, AlertCircle, Award, 
  Lightbulb, HelpCircle, ArrowRight, UserCheck, ShieldCheck, Play, Pause
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

  // AI Dialogue & Speech States
  const [aiState, setAiState] = useState<'speaking_question' | 'listening' | 'speaking_feedback' | 'idle'>('speaking_question');
  const [isAiMuted, setIsAiMuted] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(0.95);
  const [activeFeedback, setActiveFeedback] = useState<AnswerFeedback | null>(null);
  const [spokenFeedbackText, setSpokenFeedbackText] = useState<string>('');

  // Candidate Answer & Speech Recognition States
  const [answerText, setAnswerText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  // Recording timer
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(timerDurationSeconds);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(false);

  // 1. Initialize User Media (Webcam & Microphone)
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
        console.warn('Webcam/Mic access denied or unavailable:', err);
        setCameraError('Kamera atau mikrofon belum diizinkan. Anda tetap dapat melanjutkan simulasi menggunakan teks.');
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

  // 2. Setup Speech Recognition (Speech-to-Text)
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'id-ID';

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setAnswerText(prev => (prev ? prev + ' ' : '') + currentTranscript.trim());
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setAiState('idle');
    } else {
      // Stop AI voice if it was speaking
      speechService.stop();
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setAiState('listening');
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  // 3. AI Question Spoken Playback
  const speakQuestion = () => {
    if (isAiMuted) return;
    setAiState('speaking_question');
    speechService.speak(question.question, {
      rate: speechRate,
      onStart: () => setAiState('speaking_question'),
      onEnd: () => setAiState('listening'),
      onError: () => setAiState('listening'),
    });
  };

  // Auto-speak question when question changes
  useEffect(() => {
    setAnswerText('');
    setActiveFeedback(null);
    setSpokenFeedbackText('');
    setRecordingSeconds(0);
    setTimeLeft(timerDurationSeconds);
    setIsPaused(false);

    // Give browser brief tick to stabilize then speak
    const timer = setTimeout(() => {
      speakQuestion();
    }, 600);

    return () => {
      clearTimeout(timer);
      speechService.stop();
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
    };
  }, [question.id]);

  // 4. Timers (Recording duration & Question countdown)
  useEffect(() => {
    if (isPaused || activeFeedback) return;

    const interval = setInterval(() => {
      setRecordingSeconds(prev => prev + 1);
      if (mode === 'timed') {
        setTimeLeft(prev => Math.max(0, prev - 1));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, mode, activeFeedback]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Insert STAR template
  const insertStarTemplate = () => {
    const starTemplate = '[Situasi]: Pada saat kegiatan praktik/magang, ...\n[Tindakan]: Langkah teknis yang saya lakukan adalah ...\n[Hasil]: Hasilnya masalah dapat diselesaikan dan ...';
    if (!answerText) {
      setAnswerText(starTemplate);
    } else {
      setAnswerText(prev => prev + '\n\n' + starTemplate);
    }
  };

  // 5. Submit Answer & Trigger Instant AI Audio Feedback
  const handleProcessAnswer = () => {
    if (answerText.trim().length < 20) return;

    // Stop candidate recording & speech recognition
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    // Evaluate answer with our Indonesian feedback engine
    const feedback = evaluateInterviewAnswer(question, answerText.trim());
    setActiveFeedback(feedback);

    // Generate natural Indonesian conversational feedback from AI recruiter
    const feedbackSpeech = generateSpokenFeedback(question, feedback);
    setSpokenFeedbackText(feedbackSpeech);

    // AI Recruiter speaks the feedback aloud
    if (!isAiMuted) {
      setAiState('speaking_feedback');
      speechService.speak(feedbackSpeech, {
        rate: speechRate,
        onStart: () => setAiState('speaking_feedback'),
        onEnd: () => setAiState('idle'),
        onError: () => setAiState('idle'),
      });
    } else {
      setAiState('idle');
    }
  };

  // Replay Spoken Feedback
  const handleReplayFeedback = () => {
    if (!spokenFeedbackText) return;
    setAiState('speaking_feedback');
    speechService.speak(spokenFeedbackText, {
      rate: speechRate,
      onStart: () => setAiState('speaking_feedback'),
      onEnd: () => setAiState('idle'),
      onError: () => setAiState('idle'),
    });
  };

  // Continue to next question or complete session
  const handleProceedNext = () => {
    speechService.stop();
    const timeSpent = Math.max(1, recordingSeconds);
    onSubmitAnswer(answerText.trim(), timeSpent);
  };

  const charLength = answerText.trim().length;
  const isMinimumMet = charLength >= 20;

  return (
    <div className="max-w-6xl mx-auto w-full space-y-4">
      {/* Top Bar: Recruiter Banner & Progress */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" title="Online" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white tracking-tight">Ruang Wawancara Tatap Muka AI</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {field.shortName}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span>Pewawancara:</span>
              <strong className="text-slate-200 font-medium">Ibu Sarah Pratama, S.Psi. (Tim Rekrutmen Industri)</strong>
            </p>
          </div>
        </div>

        {/* Progress & Countdown Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Kemajuan Sesi:</span>
            <span className="text-sm font-bold text-slate-200">
              Pertanyaan <span className="text-blue-400">{currentIndex + 1}</span> dari {totalQuestions}
            </span>
          </div>

          <div className="bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700/80 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="font-mono font-bold text-sm text-slate-100">
              {mode === 'timed' ? formatTime(timeLeft) : formatTime(recordingSeconds)}
            </span>
          </div>

          {/* AI Mute/Unmute Toggle */}
          <button
            onClick={() => {
              const next = !isAiMuted;
              setIsAiMuted(next);
              if (next) speechService.stop();
              else speakQuestion();
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

      {/* Main Split Video Screen Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-stretch">
        
        {/* PANE 1: AI INTERVIEWER (Virtual Video Feed) */}
        <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 rounded-2xl border border-slate-700/80 p-5 flex flex-col justify-between relative overflow-hidden shadow-xl min-h-[360px] sm:min-h-[420px]">
          {/* Subtle Video Feed Noise / Scanline Glow */}
          <div className="absolute inset-0 bg-radial from-blue-900/10 via-transparent to-black/40 pointer-events-none" />

          {/* Recruiter Header Bar inside feed */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 text-xs">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="font-semibold text-slate-200">AI Recruiter Feed</span>
            </div>

            {/* AI Status Badge */}
            <div className="flex items-center gap-2">
              {aiState === 'speaking_question' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 animate-pulse">
                  <Volume2 className="w-3.5 h-3.5" />
                  AI Berbicara...
                </span>
              )}
              {aiState === 'listening' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  AI Menyimak
                </span>
              )}
              {aiState === 'speaking_feedback' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Memberikan Evaluasi
                </span>
              )}
              {aiState === 'idle' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-400">
                  Siap
                </span>
              )}
            </div>
          </div>

          {/* AI Avatar Centerpiece with Speaking Waves */}
          <div className="my-auto py-6 flex flex-col items-center justify-center relative z-10 text-center">
            <div className="relative">
              {/* Outer pulsing rings when AI speaks */}
              {(aiState === 'speaking_question' || aiState === 'speaking_feedback') && (
                <>
                  <div className="absolute -inset-4 rounded-full bg-blue-500/20 animate-ping" />
                  <div className="absolute -inset-8 rounded-full bg-blue-500/10 animate-pulse" />
                </>
              )}

              {/* Recruiter Avatar Card */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 shadow-2xl relative">
                <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center border-2 border-white/20">
                  {/* High quality corporate portrait avatar representation */}
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
                    alt="AI Interviewer"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      // Fallback if image blocked
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="text-white text-3xl font-black">SP</div>
                </div>
              </div>

              {/* Sound wave equalizer bar over avatar */}
              {(aiState === 'speaking_question' || aiState === 'speaking_feedback') && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-blue-500/40 flex items-center gap-1">
                  <span className="w-1 h-3 bg-blue-400 rounded-full animate-wave-1" />
                  <span className="w-1 h-5 bg-blue-400 rounded-full animate-wave-2" />
                  <span className="w-1 h-2 bg-blue-400 rounded-full animate-wave-3" />
                  <span className="w-1 h-4 bg-blue-400 rounded-full animate-wave-4" />
                </div>
              )}
            </div>

            <div className="mt-4">
              <h4 className="text-white font-bold text-base">Ibu Sarah Pratama</h4>
              <p className="text-xs text-slate-400">Head of Talent Acquisition & Vocational Assessor</p>
            </div>
          </div>

          {/* Bottom Captions Box: Shows Spoken Question or Spoken Feedback */}
          <div className="relative z-10 bg-slate-950/85 backdrop-blur-md rounded-xl p-4 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                {activeFeedback ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Umpan Balik Lisan AI:</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                    <span>Pertanyaan Wawancara:</span>
                  </>
                )}
              </span>

              {/* Replay voice button */}
              <button
                onClick={activeFeedback ? handleReplayFeedback : speakQuestion}
                className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded-md border border-slate-600 transition cursor-pointer"
                title="Dengarkan Ulang Suara AI"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Ulang Suara</span>
              </button>
            </div>

            <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
              {activeFeedback ? spokenFeedbackText : question.question}
            </p>

            {/* Recruiter Tips Button */}
            {!activeFeedback && (
              <div className="pt-1 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowTips(!showTips)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{showTips ? 'Tutup Petunjuk' : 'Lihat Tips Penilaian'}</span>
                </button>
                <span className="text-[11px] text-slate-500">Kompetensi: {question.evaluatedCompetency}</span>
              </div>
            )}

            {showTips && !activeFeedback && (
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs mt-2">
                <strong>Tips Rekruter:</strong> {question.contextTips}
              </div>
            )}
          </div>
        </div>

        {/* PANE 2: CANDIDATE LIVE WEBCAM & RECORDER */}
        <div className="bg-slate-900 rounded-2xl border border-slate-700/80 flex flex-col justify-between relative overflow-hidden shadow-xl min-h-[360px] sm:min-h-[420px]">
          
          {/* Top Overlays on Candidate Video */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
            {/* Blinking LIVE REC Badge */}
            <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
              <span className="font-bold tracking-wider text-rose-400">REC</span>
              <span className="font-mono text-slate-300 font-semibold">{formatTime(recordingSeconds)}</span>
            </div>

            {/* Camera & Mic Action Bar */}
            <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md p-1 rounded-xl border border-white/10">
              <button
                onClick={toggleCamera}
                className={`p-2 rounded-lg transition cursor-pointer ${
                  cameraActive ? 'text-white hover:bg-white/10' : 'bg-rose-600 text-white'
                }`}
                title={cameraActive ? 'Matikan Kamera Web' : 'Aktifkan Kamera Web'}
              >
                {cameraActive ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleMic}
                className={`p-2 rounded-lg transition cursor-pointer ${
                  micActive ? 'text-white hover:bg-white/10' : 'bg-rose-600 text-white'
                }`}
                title={micActive ? 'Matikan Mikrofon' : 'Aktifkan Mikrofon'}
              >
                {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setShowGuide(!showGuide)}
                className={`px-2 py-1 text-xs rounded-lg transition font-medium cursor-pointer ${
                  showGuide ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-white/10'
                }`}
                title="Tampilkan Panduan Posisi Wajah"
              >
                Panduan
              </button>
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
                className="w-full h-full object-cover -scale-x-100" // Mirror camera feed naturally
              />
            ) : (
              /* Fallback Candidate Avatar */
              <div className="flex flex-col items-center justify-center p-6 text-center text-slate-400 space-y-3">
                <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-300 text-2xl font-bold">
                  Siswa
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">Kamera Dinonaktifkan</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    {cameraError || 'Anda dapat mengaktifkan kamera kapan saja menggunakan tombol di pojok kanan atas.'}
                  </p>
                </div>
              </div>
            )}

            {/* Face Alignment Overlay (Dashed Guide Oval) */}
            {showGuide && cameraActive && (
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-15">
                <div className="w-48 h-64 sm:w-56 sm:h-72 rounded-[50%] border-2 border-dashed border-blue-400/80 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center" />
                <span className="mt-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-[11px] font-medium text-blue-200">
                  Posisikan wajah Anda di dalam lingkaran oval
                </span>
              </div>
            )}

            {/* Real-Time Microphone Visualizer Overlay */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
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
                {audioLevel > 15 ? 'Suara Terdeteksi' : 'Mic Siap'}
              </span>
            </div>

            {/* Candidate Name Badge */}
            <div className="absolute bottom-4 right-4 z-20 bg-black/75 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs font-semibold text-white">
              Kandidat Peserta Vokasi
            </div>
          </div>
        </div>
      </div>

      {/* Instant AI Evaluation Alert (When Answer is Evaluated) */}
      {activeFeedback && (
        <div className="bg-white rounded-2xl border-2 border-blue-500 p-5 sm:p-6 shadow-xl space-y-4 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Umpan Balik Instan AI Recruiter</h3>
                <p className="text-xs text-slate-500">Hasil evaluasi lisan atas jawaban Anda</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block font-medium">Skor Pertanyaan:</span>
                <span className="text-2xl font-black text-blue-600 leading-none">{activeFeedback.score}/100</span>
              </div>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${getScoreBadge(activeFeedback.score).color}`}>
                {getScoreBadge(activeFeedback.score).label}
              </span>
            </div>
          </div>

          {/* Feedback Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-950 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Kekuatan Jawaban:</span>
              </div>
              <ul className="space-y-1 list-disc list-inside text-emerald-900">
                {activeFeedback.strengths.map((str, i) => (
                  <li key={i}>{str}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-blue-950 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-blue-800">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Saran Perbaikan:</span>
              </div>
              <ul className="space-y-1 list-disc list-inside text-blue-900">
                {activeFeedback.suggestions.map((sug, i) => (
                  <li key={i}>{sug}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Next Question / Finish Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleReplayFeedback}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Dengarkan Ulang Audio Penilaian</span>
            </button>

            <button
              onClick={handleProceedNext}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 hover:shadow-lg transition cursor-pointer active:scale-95"
            >
              <span>{currentIndex + 1 === totalQuestions ? 'Selesai & Buka Laporan Lengkap' : 'Lanjut ke Pertanyaan Berikutnya'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Candidate Response Workspace (When not yet evaluated) */}
      {!activeFeedback && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <label htmlFor="voice-answer-input" className="font-bold text-slate-900 text-sm block">
                Jawaban Lisan & Transkripsi Anda:
              </label>
              <p className="text-xs text-slate-500">
                Klik tombol <strong className="text-slate-700">"Mulai Rekam Lisan"</strong> untuk berbicara langsung, atau ketik manual jika diinginkan.
              </p>
            </div>

            {/* Action buttons: Record Speech + STAR Helper */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={insertStarTemplate}
                className="text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 transition cursor-pointer active:scale-95"
                title="Sisipkan struktur STAR"
              >
                + Format STAR
              </button>

              {speechSupported && (
                <button
                  type="button"
                  onClick={toggleSpeechRecognition}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer active:scale-95 ${
                    isListening
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-4 h-4" />
                      <span>Sedang Merekam Suara... (Klik untuk Selesai)</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4" />
                      <span>Mulai Rekam Lisan</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Textarea for live transcript / manual typing */}
          <div>
            <textarea
              id="voice-answer-input"
              rows={4}
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Jawaban lisan Anda akan tertranskripsi otomatis di sini saat berbicara. Anda juga dapat menyunting atau mengetik langsung..."
              className="w-full p-4 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-900 text-sm leading-relaxed placeholder:text-slate-400 outline-none transition resize-y"
            />

            <div className="flex items-center justify-between text-xs text-slate-400 mt-1.5 px-1">
              <span>Minimal 20 karakter untuk penilaian akurat</span>
              <span className={charLength >= 20 ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                {charLength} karakter
              </span>
            </div>
          </div>

          {/* Submit Answer & Request AI Vocal Feedback */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onCancel}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 transition py-2 cursor-pointer"
            >
              ← Kembali ke Pilihan Bidang
            </button>

            <button
              type="button"
              disabled={!isMinimumMet}
              onClick={handleProcessAnswer}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-bold text-sm transition shadow-md cursor-pointer ${
                isMinimumMet
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white active:scale-95 shadow-blue-500/20'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Kirim Jawaban & Dengar Tanggapan Audio AI</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
