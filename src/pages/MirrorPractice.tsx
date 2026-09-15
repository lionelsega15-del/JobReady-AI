import React, { useState, useEffect, useRef } from 'react';
import { PageView } from '../types';
import { 
  Camera, CameraOff, Mic, MicOff, Play, Square, RotateCcw, 
  Eye, Volume2, ShieldCheck, ArrowRight, ArrowLeft, 
  CheckCircle2, Clock, MessageSquareQuote, Video as VideoIcon, AlertCircle
} from 'lucide-react';

interface MirrorPracticePageProps {
  onNavigate: (page: PageView) => void;
}

export const MirrorPracticePage: React.FC<MirrorPracticePageProps> = ({ onNavigate }) => {
  // Video & Stream
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recordedVideoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(true);
  const [micActive, setMicActive] = useState<boolean>(true);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Audio Level Analyser
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Recording states
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [hasRecorded, setHasRecorded] = useState<boolean>(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  // Live Speech Recognition
  const [transcript, setTranscript] = useState<string>('');
  const recognitionRef = useRef<any>(null);

  // Start Camera on Mount
  useEffect(() => {
    let localStream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        setCameraError(null);
        localStream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
          audio: true,
        });

        setStream(localStream);
        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
        }

        // Setup Audio Analyser
        try {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContextClass) {
            const audioCtx = new AudioContextClass();
            audioContextRef.current = audioCtx;
            const source = audioCtx.createMediaStreamSource(localStream);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 64;
            source.connect(analyser);
            analyserRef.current = analyser;

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const updateMeter = () => {
              if (analyserRef.current) {
                analyserRef.current.getByteFrequencyData(dataArray);
                let sum = 0;
                for (let i = 0; i < bufferLength; i++) {
                  sum += dataArray[i];
                }
                const avg = sum / bufferLength;
                const normalized = Math.min(100, Math.round((avg / 128) * 100));
                setAudioLevel(normalized);
              }
              animFrameRef.current = requestAnimationFrame(updateMeter);
            };
            updateMeter();
          }
        } catch (audioErr) {
          console.warn('Audio analyser init error:', audioErr);
        }
      } catch (err: any) {
        console.warn('Camera/Mic permission error:', err);
        setCameraError('Kamera atau mikrofon belum diizinkan. Aktifkan izin browser untuk melihat cermin latihan.');
      }
    };

    startCamera();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
      if (localStream) {
        localStream.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  // Timer while recording (max 60s)
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 60) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecording]);

  // Toggle Camera
  const toggleCamera = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setCameraActive(!cameraActive);
    }
  };

  // Toggle Mic
  const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setMicActive(!micActive);
    }
  };

  // Start Recording
  const startRecording = () => {
    if (!stream) return;

    setTranscript('');
    setRecordedVideoUrl(null);
    setHasRecorded(false);
    setRecordingSeconds(0);
    recordedChunksRef.current = [];

    // Setup MediaRecorder
    try {
      let mimeType = 'video/webm;codecs=vp9,opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = '';
        }
      }

      const recorder = mimeType 
        ? new MediaRecorder(stream, { mimeType }) 
        : new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
        setHasRecorded(true);
      };

      recorder.start(250);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start MediaRecorder:', err);
    }

    // Setup Web Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recog = new SpeechRecognition();
        recog.lang = 'id-ID';
        recog.continuous = true;
        recog.interimResults = true;

        recog.onresult = (event: any) => {
          let full = '';
          for (let i = 0; i < event.results.length; i++) {
            full += event.results[i][0].transcript + ' ';
          }
          setTranscript(full.trim());
        };

        recog.onerror = (e: any) => {
          console.warn('Speech recog error in mirror:', e);
        };

        recog.start();
        recognitionRef.current = recog;
      } catch (recogErr) {
        console.warn('Speech recog start failed:', recogErr);
      }
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setIsRecording(false);
  };

  // Instant Feedback Metrics
  const words = transcript.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const durationSec = Math.max(1, recordingSeconds);
  const estimatedWpm = Math.round((wordCount / (durationSec / 60)));

  // Detect Fillers
  const fillerMatch = transcript.match(/\b(e+m+|u+m+|anu|apa ya|kayak|ngg+)\b/gi) || [];
  const fillerCount = fillerMatch.length;

  return (
    <div className="py-4 sm:py-8 px-3 sm:px-6 max-w-5xl mx-auto flex-1 flex flex-col justify-center w-full">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition btn-bouncy cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <button
          onClick={() => onNavigate('interview')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-black shadow-warm-orange btn-bouncy transition cursor-pointer"
        >
          <span>Lanjut ke Simulasi Wawancara Asli</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT / TOP: The Digital Mirror Viewport (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-3.5 sm:p-5 text-white shadow-soft border-2 border-indigo-300/40 relative overflow-hidden flex flex-col">
          {/* Eye Contact Guide Banner */}
          <div className="relative z-20 flex items-center justify-between gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs mb-3">
            <div className="flex items-center gap-2">
              {/* Pulsing Eye-Contact Dot */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-300 font-extrabold text-[11px]">
                Target Kontak Mata
              </span>
            </div>
            <span className="text-[11px] text-slate-300 hidden sm:inline font-medium">
              Tatap ke arah titik ini (lensa kamera) saat berbicara
            </span>
          </div>

          {/* Video Frame */}
          <div className="relative w-full aspect-video bg-black/80 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
            {cameraError ? (
              <div className="p-4 text-center space-y-2 max-w-xs text-slate-300">
                <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                <p className="text-xs">{cameraError}</p>
              </div>
            ) : (
              <>
                {/* Live Mirror Feed (shown during idle and recording) */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover transform scale-x-[-1] ${
                    hasRecorded && !isRecording ? 'hidden' : 'block'
                  }`}
                />

                {/* Playback Video (shown after recording finished) */}
                {hasRecorded && !isRecording && recordedVideoUrl && (
                  <video
                    ref={recordedVideoRef}
                    src={recordedVideoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Recording Indicator Overlay */}
                {isRecording && (
                  <div className="absolute top-3 left-3 z-30 flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold animate-pulse shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>Merekam: {60 - recordingSeconds}s tersisa</span>
                  </div>
                )}

                {/* Audio Level Bar Overlay */}
                {micActive && !cameraError && (
                  <div className="absolute bottom-3 left-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px]">
                    <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                    <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 transition-all duration-75"
                        style={{ width: `${audioLevel}%` }}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Controls Under Video */}
          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggleCamera}
                className={`p-2.5 rounded-full text-xs font-medium transition cursor-pointer btn-bouncy ${
                  cameraActive ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500/30 text-red-300'
                }`}
                title={cameraActive ? 'Matikan Kamera' : 'Nyalakan Kamera'}
              >
                {cameraActive ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={toggleMic}
                className={`p-2.5 rounded-full text-xs font-medium transition cursor-pointer btn-bouncy ${
                  micActive ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500/30 text-red-300'
                }`}
                title={micActive ? 'Matikan Mikrofon' : 'Nyalakan Mikrofon'}
              >
                {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>
            </div>

            {/* Main Action Record / Stop Button */}
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs sm:text-sm font-black shadow-warm-orange btn-bouncy transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{hasRecorded ? 'Rekam Ulang (60s)' : 'Mulai Rekam Pitch (60s)'}</span>
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-bold border border-red-500/50 btn-bouncy transition cursor-pointer"
              >
                <Square className="w-4 h-4 fill-red-500 text-red-500" />
                <span>Selesai Bicara ({recordingSeconds}s)</span>
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: Practice Guide & Instant Feedback (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Guide Card */}
          <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-5 shadow-soft space-y-3">
            <div className="flex items-center gap-2 text-orange-600">
              <VideoIcon className="w-5 h-5 text-orange-500" />
              <h3 className="font-black text-sm tracking-tight text-slate-900">
                Latihan Elevator Pitch 60 Detik
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Mode ini dibuat agar kamu bebas membiasakan diri berbicara di hadapan kamera <strong>tanpa takut dinilai salah</strong>.
            </p>

            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2">
              <span className="text-[11px] font-black text-amber-950 uppercase tracking-wider block">
                🎯 4 Poin Pembuka Bebas Canggung:
              </span>
              <ol className="text-xs text-slate-700 space-y-1.5 list-decimal list-inside font-medium">
                <li>Sebutkan nama lengkap & jurusan SMK-mu</li>
                <li>Apa keahlian praktis yang paling kamu senangi?</li>
                <li>Ceritakan 1 pengalaman praktik bengkel/PKL terbaikmu</li>
                <li>Tutup dengan semangat kesiapanmu bekerja</li>
              </ol>
            </div>
          </div>

          {/* Real-time Transcription or Post-Pitch Review */}
          <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-5 shadow-soft space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>{isRecording ? 'Transkrip Suara Terdeteksi:' : 'Hasil Latihan Pitch:'}</span>
              {hasRecorded && !isRecording && (
                <span className="text-emerald-700 font-black text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                </span>
              )}
            </h4>

            {isRecording ? (
              <div className="min-h-[90px] p-4 rounded-2xl bg-orange-50/50 border border-orange-200 text-xs text-slate-800 leading-relaxed italic">
                {transcript ? transcript : 'Mendengarkan ucapanmu... Bicaralah dengan santai dan jelas.'}
              </div>
            ) : hasRecorded ? (
              <div className="space-y-3">
                {/* Instant Metrics Badge */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-2.5">
                    <span className="text-[10px] text-orange-950 font-bold block">Durasi</span>
                    <span className="text-sm font-black text-slate-900">{durationSec}s</span>
                  </div>
                  <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-2.5">
                    <span className="text-[10px] text-sky-950 font-bold block">Kecepatan</span>
                    <span className="text-sm font-black text-sky-700">{estimatedWpm} WPM</span>
                  </div>
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-2.5">
                    <span className="text-[10px] text-emerald-950 font-bold block">Gumaman</span>
                    <span className={`text-sm font-black ${fillerCount > 2 ? 'text-amber-600' : 'text-emerald-700'}`}>
                      {fillerCount}x
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 max-h-28 overflow-y-auto">
                  <strong className="block text-[11px] text-slate-500 mb-1">Transkrip Lengkap:</strong>
                  {transcript || '(Transkrip suara belum terdeteksi, pastikan mikrofon aktif).'}
                </div>

                <p className="text-[11px] text-slate-500 italic text-center">
                  💡 Putar video di samping untuk mendengarkan intonasi suaramu sendiri. Semakin sering mendengar suara sendiri, rasa canggung akan hilang!
                </p>
              </div>
            ) : (
              <div className="min-h-[80px] flex items-center justify-center text-center p-4 rounded-2xl bg-amber-50/40 border border-dashed border-amber-200 text-xs text-slate-500">
                Tekan tombol "Mulai Rekam Pitch (60s)" untuk mencoba bicara di cermin.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
