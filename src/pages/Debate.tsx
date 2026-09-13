import React, { useState, useEffect, useRef, useCallback } from "react";
import { PageView } from "../types";
import { speechService } from "../lib/speech-service";
import {
  Mic, MicOff, Volume2, VolumeX, MessageSquare, ChevronRight,
  Zap, Trophy, ArrowLeft, RotateCcw, Brain
} from "lucide-react";

interface DebateTopic {
  id: string;
  title: string;
  description: string;
  aiPosition: string;
  icon: string;
  difficulty: "Mudah" | "Sedang" | "Sulit";
  difficultyColor: string;
  category: string;
}

interface ChatMessage {
  id: string;
  role: "ai" | "user";
  text: string;
  timestamp: number;
}

const DEBATE_TOPICS: DebateTopic[] = [
  {
    id: "work-from-home",
    title: "Work From Home vs Kerja di Kantor",
    description: "Apakah bekerja dari rumah lebih produktif dibanding di kantor?",
    aiPosition: "Saya berpendapat bahwa bekerja di kantor lebih produktif dan penting untuk kemajuan karir.",
    icon: "🏠", difficulty: "Mudah",
    difficultyColor: "text-emerald-600 bg-emerald-50 border-emerald-200", category: "Dunia Kerja",
  },
  {
    id: "ai-replace-jobs",
    title: "AI Menggantikan Pekerjaan Manusia",
    description: "Apakah kecerdasan buatan akan mengambil alih pekerjaan manusia?",
    aiPosition: "Saya percaya bahwa AI justru menciptakan lebih banyak peluang kerja baru daripada menghilangkannya.",
    icon: "🤖", difficulty: "Sedang",
    difficultyColor: "text-amber-600 bg-amber-50 border-amber-200", category: "Teknologi",
  },
  {
    id: "fresh-grad-salary",
    title: "Gaji Fresh Graduate Terlalu Rendah",
    description: "Apakah standar gaji fresh graduate di Indonesia sudah layak?",
    aiPosition: "Saya berpendapat bahwa gaji fresh graduate sudah cukup proporsional dengan pengalaman mereka.",
    icon: "💰", difficulty: "Sedang",
    difficultyColor: "text-amber-600 bg-amber-50 border-amber-200", category: "Karir",
  },
  {
    id: "hard-vs-soft-skill",
    title: "Hard Skill vs Soft Skill",
    description: "Mana yang lebih penting untuk kesuksesan karir?",
    aiPosition: "Menurut saya, hard skill jauh lebih penting karena itulah yang pertama kali dinilai perusahaan.",
    icon: "🧠", difficulty: "Mudah",
    difficultyColor: "text-emerald-600 bg-emerald-50 border-emerald-200", category: "Pengembangan Diri",
  },
  {
    id: "college-vs-vocational",
    title: "Kuliah vs SMK/Vokasi Langsung Kerja",
    description: "Apakah lulusan SMK lebih siap kerja dibanding sarjana?",
    aiPosition: "Saya percaya bahwa lulusan sarjana memiliki keunggulan jangka panjang yang lebih besar dalam karir.",
    icon: "🎓", difficulty: "Sulit",
    difficultyColor: "text-rose-600 bg-rose-50 border-rose-200", category: "Pendidikan",
  },
  {
    id: "social-media-career",
    title: "Media Sosial untuk Karir",
    description: "Apakah aktif di media sosial penting untuk karir profesional?",
    aiPosition: "Saya berpendapat bahwa terlalu aktif di media sosial justru bisa merugikan citra profesional.",
    icon: "📱", difficulty: "Mudah",
    difficultyColor: "text-emerald-600 bg-emerald-50 border-emerald-200", category: "Personal Branding",
  },
];

const COUNTERS: Record<string, string[]> = {
  "work-from-home": [
    "Menarik sekali! Tapi bukankah kerja dari rumah membuat batasan kehidupan pribadi dan pekerjaan menjadi kabur? Banyak penelitian menunjukkan produktivitas justru turun karena banyak gangguan di rumah.",
    "Saya memahami perspektif Anda. Namun, bagaimana dengan kolaborasi tim? Sinergi dan kreativitas kolektif jauh lebih baik saat bertatap muka langsung daripada meeting virtual.",
    "Anda mengangkat poin yang valid. Tapi jangan lupakan aspek pengembangan karir — mentoring dan networking jauh lebih efektif dilakukan secara langsung di kantor.",
    "Terima kasih atas argumen Anda. Meski begitu, perusahaan top seperti Apple dan Google justru meminta karyawan kembali ke kantor — itu bukan tanpa alasan. Mereka melihat dampak nyata pada inovasi.",
  ],
  "ai-replace-jobs": [
    "Pandangan yang menarik! Namun sejarah menunjukkan sebaliknya — revolusi industri sempat menimbulkan ketakutan serupa, tapi justru menciptakan lebih banyak lapangan kerja baru.",
    "Saya menghargai kekhawatiran Anda. Tapi pekerjaan yang digantikan AI umumnya repetitif. Ini membebaskan manusia untuk fokus pada pekerjaan yang butuh empati dan kreativitas.",
    "Riset World Economic Forum memperkirakan AI akan menciptakan 97 juta pekerjaan baru pada 2025. Kuncinya ada pada adaptasi dan reskilling yang tepat.",
    "Ketakutan terhadap teknologi selalu ada di setiap era. Yang membedakan manusia dari AI adalah kemampuan berpikir kritis dan intelegensi emosional.",
  ],
  "fresh-grad-salary": [
    "Saya mengerti frustrasi ini. Namun perusahaan berinvestasi besar dalam pelatihan fresh graduate. Gaji awal yang lebih rendah mencerminkan investasi tersebut.",
    "Poin Anda valid, tapi coba bandingkan dengan biaya hidup dan UMR di berbagai daerah. Standardisasi gaji nasional perlu mempertimbangkan faktor regional.",
    "Apakah fair membandingkan fresh graduate dengan karyawan berpengalaman? Nilai seorang karyawan terbukti dari track record dan kontribusi nyata.",
    "Banyak fresh graduate berhasil bernegosiasi gaji lebih tinggi dengan menunjukkan portofolio kuat. Masalahnya mungkin pada kesiapan kandidat, bukan sistemnya.",
  ],
  "hard-vs-soft-skill": [
    "Survei LinkedIn menunjukkan 92% HRD menyatakan soft skill sama pentingnya atau lebih penting dari hard skill. Komunikasi dan kepemimpinan adalah yang paling dicari.",
    "Tapi bayangkan dokter dengan soft skill luar biasa namun kemampuan medis tidak memadai — berbahaya bukan? Hard skill adalah fondasi yang tidak bisa dikompromikan.",
    "Hard skill yang spesifik dan terukur adalah pembeda utama di CV. Soft skill lebih mudah diasah on-the-job, tapi hard skill butuh waktu bertahun-tahun.",
    "Di era AI, soft skill seperti empati dan kreativitas sulit diotomasi. Tapi tanpa hard skill solid, soft skill tidak punya medium untuk berkembang.",
  ],
  "college-vs-vocational": [
    "Data BPS menunjukkan tingkat pengangguran lulusan SMK masih lebih tinggi dibanding sarjana. Gelar sarjana membuka lebih banyak pintu, terutama untuk posisi manajerial.",
    "Lihat 10 tahun ke depan — siapa yang lebih mungkin menduduki posisi kepemimpinan? Pondasi teoritis dari pendidikan tinggi krusial untuk pertumbuhan karir jangka panjang.",
    "SMK memang menghasilkan tenaga terampil. Namun di era yang terus berubah, fleksibilitas yang dilatih di perguruan tinggi menjadi keunggulan kompetitif tersendiri.",
    "Jaringan alumni dan kesempatan riset yang hanya didapat di perguruan tinggi berpengaruh besar pada pertumbuhan karir seseorang.",
  ],
  "social-media-career": [
    "70% HRD sekarang mengecek LinkedIn kandidat sebelum interview. Tidak hadir di sana sama dengan tidak ada di peta profesional.",
    "Ada perbedaan antara aktif dan profesional di media sosial. Personal branding yang tepat justru membuka peluang karir yang tidak terduga.",
    "Thought leadership online adalah cara paling efektif membangun reputasi profesional. Banyak peluang datang dari koneksi digital.",
    "Para profesional yang membangun bisnis hanya melalui konten digital membuktikan bahwa media sosial yang dikelola baik adalah aset, bukan beban.",
  ],
};

function generateAICounter(topic: DebateTopic, roundNumber: number): string {
  const counters = COUNTERS[topic.id] || [
    "Argumen yang menarik! Namun bukti yang ada justru mendukung posisi saya. Bisakah Anda memberikan contoh konkret?",
    "Saya menghargai pandangan Anda. Apakah Anda mempertimbangkan dampak jangka panjang dari ide tersebut?",
    "Poin yang valid! Namun ada faktor penting yang mungkin terlewat dalam konteks yang lebih luas.",
    "Terima kasih atas penjelasannya. Meski begitu, bukti empiris lebih mendukung posisi saya.",
  ];
  if (roundNumber >= 4) {
    return `Debat yang luar biasa! Sebagai penutup: ${topic.aiPosition} Anda telah memberikan challenge yang membuat saya berpikir lebih dalam. Bagus sekali!`;
  }
  return counters[Math.min(roundNumber, counters.length - 1)];
}

function getOpeningStatement(topic: DebateTopic): string {
  return `Halo! Selamat datang di sesi debat hari ini. Topik kita adalah: ${topic.title}. ${topic.aiPosition} Silakan sampaikan pendapat Anda — tekan tombol mikrofon dan mulailah berbicara!`;
}

interface DebatePageProps { onNavigate: (page: PageView) => void; }

export const DebatePage: React.FC<DebatePageProps> = ({ onNavigate }) => {
  const [phase, setPhase] = useState<"select" | "debate">("select");
  const [selectedTopic, setSelectedTopic] = useState<DebateTopic | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [round, setRound] = useState(0);
  const [isDebateOver, setIsDebateOver] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [hasSpeechRecognition, setHasSpeechRecognition] = useState(false);

  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const roundRef = useRef(round);
  const selectedTopicRef = useRef(selectedTopic);
  const isMutedRef = useRef(isMuted);

  useEffect(() => { roundRef.current = round; }, [round]);
  useEffect(() => { selectedTopicRef.current = selectedTopic; }, [selectedTopic]);
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setHasSpeechRecognition(!!SR);
  }, []);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, liveTranscript]);

  const addMessage = useCallback((role: "ai" | "user", text: string) => {
    setMessages(prev => [...prev, { id: `${Date.now()}-${Math.random()}`, role, text, timestamp: Date.now() }]);
  }, []);

  const speakAI = useCallback((text: string, onDone?: () => void) => {
    if (isMutedRef.current) { onDone?.(); return; }
    setIsSpeaking(true);
    speechService.speak(text, {
      rate: 0.92,
      onEnd: () => { setIsSpeaking(false); onDone?.(); },
      onError: () => { setIsSpeaking(false); onDone?.(); },
    });
  }, []);

  const startListeningFn = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.lang = "id-ID";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognitionRef.current = recognition;
    let finalT = "";

    recognition.onstart = () => { setIsListening(true); setLiveTranscript(""); };
    recognition.onresult = (event: any) => {
      let interim = "";
      finalT = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalT += t; else interim += t;
      }
      setLiveTranscript(finalT || interim);
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(() => {
        if (finalT.trim().length > 5) recognition.stop();
      }, 2000);
    };
    recognition.onend = () => {
      setIsListening(false);
      setLiveTranscript("");
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      const spoken = finalT.trim();
      if (spoken.length < 3) return;
      addMessage("user", spoken);
      const pts = Math.min(spoken.split(" ").length * 2, 25);
      setUserScore(prev => prev + pts);
      const newRound = roundRef.current + 1;
      setRound(newRound);
      const topic = selectedTopicRef.current;
      if (!topic) return;
      if (newRound > 5) {
        setIsDebateOver(true);
        const closing = "Debat kita telah selesai! Terima kasih atas diskusi yang sangat bermutu. Anda telah menyampaikan argumen dengan baik!";
        addMessage("ai", closing);
        speakAI(closing);
        return;
      }
      const aiResp = generateAICounter(topic, newRound);
      const aiPts = Math.floor(Math.random() * 15) + 10;
      setAiScore(prev => prev + aiPts);
      setTimeout(() => {
        addMessage("ai", aiResp);
        speakAI(aiResp, () => {
          if (newRound <= 4) setTimeout(() => startListeningFn(), 800);
          else setIsDebateOver(true);
        });
      }, 600);
    };
    recognition.onerror = () => { setIsListening(false); };
    recognition.start();
  }, [addMessage, speakAI]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    setIsListening(false);
    setLiveTranscript("");
  }, []);

  const startDebate = useCallback((topic: DebateTopic) => {
    setSelectedTopic(topic);
    setMessages([]); setRound(0); setIsDebateOver(false);
    setUserScore(0); setAiScore(0);
    roundRef.current = 0; selectedTopicRef.current = topic;
    setPhase("debate");
    const opening = getOpeningStatement(topic);
    setTimeout(() => {
      addMessage("ai", opening);
      speakAI(opening, () => setTimeout(() => startListeningFn(), 500));
    }, 400);
  }, [addMessage, speakAI, startListeningFn]);

  const resetDebate = () => {
    speechService.stop(); stopListening();
    setPhase("select"); setSelectedTopic(null);
    setMessages([]); setRound(0); setIsDebateOver(false);
    setUserScore(0); setAiScore(0);
  };

  const toggleMute = () => {
    if (!isMuted) speechService.stop();
    setIsMuted(prev => !prev);
  };

  const winner = isDebateOver
    ? userScore > aiScore ? "user" : userScore === aiScore ? "draw" : "ai"
    : null;

  if (phase === "select") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white">
        <div className="max-w-5xl mx-auto px-4 pt-12 pb-10">
          <button onClick={() => onNavigate("home")} className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8 text-sm cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </button>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-sm font-medium mb-5">
              <Zap className="w-4 h-4" /> Fitur Baru — Beta
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">AI Debat Partner</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Bicara langsung — AI langsung counter-argument kamu secara real-time via suara. Tidak perlu ketik, tidak perlu tombol kirim. Debat murni suara ke suara! 🎙️
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
            {[{ icon: "🎯", label: "Pilih Topik" }, { icon: "🎙️", label: "Bicara Bebas" }, { icon: "🤖", label: "AI Langsung Balas" }].map((s, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xs text-slate-300 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEBATE_TOPICS.map(topic => (
              <button key={topic.id} onClick={() => startDebate(topic)}
                className="group text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-200 cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{topic.icon}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${topic.difficultyColor}`}>{topic.difficulty}</span>
                </div>
                <div className="text-xs text-purple-300 font-medium mb-1">{topic.category}</div>
                <h3 className="font-bold text-white text-sm mb-2 group-hover:text-purple-200 transition">{topic.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{topic.description}</p>
                <div className="mt-3 flex items-center gap-1 text-purple-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition">
                  Mulai Debat <ChevronRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white flex flex-col">
      <div className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={resetDebate} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="font-bold text-sm text-white">{selectedTopic?.icon} {selectedTopic?.title}</div>
              <div className="text-xs text-slate-400">Ronde {Math.min(round + 1, 5)} / 5</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right"><div className="text-xs text-slate-400">Kamu</div><div className="text-lg font-extrabold text-emerald-400">{userScore}</div></div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-left"><div className="text-xs text-slate-400">AI</div><div className="text-lg font-extrabold text-fuchsia-400">{aiScore}</div></div>
            <button onClick={toggleMute} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer">
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button onClick={resetDebate} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold ${msg.role === "ai" ? "bg-gradient-to-br from-purple-500 to-fuchsia-600" : "bg-gradient-to-br from-emerald-500 to-teal-600"}`}>
                {msg.role === "ai" ? "🤖" : "🧑"}
              </div>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "ai" ? "bg-white/10 text-slate-100 rounded-tl-sm border border-purple-400/20" : "bg-emerald-500/20 text-emerald-100 rounded-tr-sm border border-emerald-400/20"}`}>
                {msg.role === "ai" && <div className="flex items-center gap-1.5 text-xs text-purple-300 font-semibold mb-1"><Brain className="w-3 h-3" /> AI Debater</div>}
                {msg.role === "user" && <div className="text-xs text-emerald-300 font-semibold mb-1 text-right">Kamu</div>}
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          {isListening && liveTranscript && (
            <div className="flex gap-3 flex-row-reverse">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">🧑</div>
              <div className="max-w-[75%] rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed bg-emerald-500/10 border border-emerald-400/20 border-dashed text-emerald-200 italic">
                <div className="text-xs text-emerald-300 font-semibold mb-1">Merekam...</div>
                {liveTranscript}<span className="animate-pulse">▊</span>
              </div>
            </div>
          )}
          {isSpeaking && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center">🤖</div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/10 border border-purple-400/20 flex items-center gap-2">
                <div className="flex gap-1 items-end h-6">
                  {[0,1,2,3].map(i => (
                    <div key={i} className="w-1.5 bg-purple-400 rounded-full" style={{ height: "100%", animation: `aibar 0.6s ease-in-out ${i*0.15}s infinite alternate` }} />
                  ))}
                </div>
                <span className="text-xs text-purple-300">AI sedang berbicara...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {isDebateOver && winner && (
        <div className="border-t border-white/10 bg-slate-900/80 backdrop-blur-md px-4 py-6">
          <div className="max-w-3xl mx-auto text-center">
            <Trophy className="w-10 h-10 mx-auto mb-3 text-yellow-400" />
            <h2 className="text-2xl font-extrabold mb-1">
              {winner === "user" && "🏆 Kamu Menang!"}
              {winner === "ai" && "🤖 AI Menang!"}
              {winner === "draw" && "🤝 Seri!"}
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              {winner === "user" && "Argumenmu sangat kuat dan meyakinkan. Kerja bagus!"}
              {winner === "ai" && "AI memberikan counter-argument yang lebih kuat. Coba lagi!"}
              {winner === "draw" && "Debat yang seimbang! Keduanya memberikan argumen setara."}
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => startDebate(selectedTopic!)} className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-semibold text-sm transition cursor-pointer">
                <RotateCcw className="w-4 h-4 inline mr-1.5" /> Debat Ulang
              </button>
              <button onClick={resetDebate} className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 font-semibold text-sm transition cursor-pointer">Topik Lain</button>
            </div>
          </div>
        </div>
      )}

      {!isDebateOver && (
        <div className="border-t border-white/10 bg-slate-900/80 backdrop-blur-md px-4 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-center gap-6">
            <div className="text-sm text-slate-400 text-center min-w-[160px]">
              {isSpeaking && <span className="text-purple-300 font-medium">🤖 AI sedang bicara...</span>}
              {isListening && <span className="text-emerald-300 font-medium animate-pulse">🎙️ Sedang merekam...</span>}
              {!isSpeaking && !isListening && (
                <span>{hasSpeechRecognition ? "Tekan mikrofon untuk bicara" : "⚠️ Gunakan Chrome/Edge"}</span>
              )}
            </div>
            <button
              onClick={isListening ? stopListening : startListeningFn}
              disabled={isSpeaking || !hasSpeechRecognition}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${isListening ? "bg-rose-500 hover:bg-rose-400 shadow-rose-500/40 scale-110 ring-4 ring-rose-400/30" : "bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/30 hover:scale-105"}`}
            >
              {isListening ? <MicOff className="w-7 h-7 text-white" /> : <Mic className="w-7 h-7 text-white" />}
            </button>
            <div className="min-w-[160px] text-center text-xs text-slate-500">
              {isListening && <span className="text-rose-400">Klik lagi untuk stop & kirim</span>}
              {!isListening && !isSpeaking && <span>Diam 2 detik = otomatis kirim</span>}
            </div>
          </div>
        </div>
      )}

      {!hasSpeechRecognition && !isDebateOver && (
        <div className="px-4 pb-4 max-w-3xl mx-auto">
          <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-200 text-sm text-center flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Browser kamu tidak mendukung Speech Recognition. Gunakan Chrome atau Edge.
          </div>
        </div>
      )}

      <style>{`@keyframes aibar { from { transform: scaleY(0.3); } to { transform: scaleY(1); } }`}</style>
    </div>
  );
};
