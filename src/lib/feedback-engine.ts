import { InterviewQuestion, AnswerFeedback, UserInterviewAnswer, ConfidenceMetrics, FillerWordOccurrence } from '../types';

export function evaluateInterviewAnswer(
  question: InterviewQuestion,
  answerText: string
): AnswerFeedback {
  const cleanAnswer = answerText.trim();
  const charLength = cleanAnswer.length;
  const words = cleanAnswer.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // Keyword matching
  const matchedKeywords: string[] = [];
  question.keywords.forEach(kw => {
    const lowerKw = kw.toLowerCase();
    if (cleanAnswer.toLowerCase().includes(lowerKw)) {
      matchedKeywords.push(kw);
    }
  });

  const keywordMatchRatio = question.keywords.length > 0
    ? matchedKeywords.length / question.keywords.length
    : 0;

  // Star method indicators (Indonesian keywords indicating structure)
  const starIndicators = [
    'saat', 'ketika', 'tugas', 'tanggung jawab', 'langkah', 'kemudian', 
    'solusi', 'hasilnya', 'sehingga', 'belajar', 'berhasil', 'pengalaman'
  ];
  const hasStarStructure = starIndicators.filter(si => 
    cleanAnswer.toLowerCase().includes(si)
  ).length >= 2;

  // Scoring algorithm (0 - 100)
  let score = 0;
  const strengths: string[] = [];
  const suggestions: string[] = [];
  let summary = '';
  let critique = '';

  if (charLength < 20) {
    score = Math.min(25, Math.max(10, charLength));
    summary = 'Jawaban Terlalu Singkat';
    critique = 'Jawaban belum memberikan gambaran yang cukup bagi pewawancara. Di dunia industri, pewawancara ingin mendengar alur penalaran dan pengalaman nyatamu.';
    suggestions.push('Jelaskan minimal dalam 2–3 kalimat lengkap.');
    suggestions.push('Ceritakan contoh situasi nyata yang pernah kamu alami di sekolah atau tempat PKL.');
  } else if (charLength < 60) {
    score = 40 + Math.floor(matchedKeywords.length * 8);
    summary = 'Jawaban Cukup Singkat';
    critique = 'Jawaban sudah mulai menjawab inti pertanyaan, tetapi masih kurang mendalam dan belum disertai bukti konkret.';
    if (matchedKeywords.length > 0) {
      strengths.push(`Terdapat istilah kejuruan yang relevan: ${matchedKeywords.slice(0, 3).join(', ')}.`);
    }
    suggestions.push('Kembangkan jawaban dengan menjabarkan langkah atau tindakan spesifik yang kamu lakukan.');
    suggestions.push('Sebutkan hasil atau dampak positif dari tindakan tersebut.');
  } else {
    // charLength >= 60
    const lengthBonus = Math.min(40, Math.floor((charLength / 250) * 40));
    const keywordScore = Math.min(40, matchedKeywords.length * 10);
    const starBonus = hasStarStructure ? 20 : 10;
    
    score = Math.min(100, 30 + lengthBonus + keywordScore + starBonus);

    if (score >= 80) {
      summary = 'Jawaban Sangat Baik & Relevan';
      critique = 'Jawaban terstruktur rapi, menunjukkan penguasaan materi kejuruan, dan disampaikan dengan nada profesional.';
      strengths.push('Panjang jawaban proporsional dan tidak bertele-tele.');
      if (matchedKeywords.length > 0) {
        strengths.push(`Memuat kata kunci industri penting: ${matchedKeywords.join(', ')}.`);
      }
      if (hasStarStructure) {
        strengths.push('Alur pemikiran runtut menggambarkan situasi dan tindakan nyata.');
      }
      suggestions.push('Pertahankan ketenangan dan intonasi artikulasi saat menyampaikan jawaban ini secara lisan.');
    } else {
      summary = 'Jawaban Cukup Baik & Mengena';
      critique = 'Jawaban sudah menjawab pertanyaan pokok dengan konteks yang jelas, namun masih dapat diperkuat dengan terminologi industri yang lebih tepat.';
      if (matchedKeywords.length > 0) {
        strengths.push(`Menggunakan terminologi yang sesuai: ${matchedKeywords.join(', ')}.`);
      }
      if (matchedKeywords.length < 2) {
        suggestions.push(`Coba sertakan istilah teknis relevan, misalnya: ${question.keywords.slice(0, 4).join(', ')}.`);
      }
      suggestions.push('Gunakan metode STAR (Situasi, Tugas, Aksi, Hasil) agar jawaban lebih meyakinkan.');
    }
  }

  // Determine status category
  let status: 'needs-improvement' | 'moderate' | 'excellent' = 'moderate';
  if (score < 50) {
    status = 'needs-improvement';
  } else if (score >= 80) {
    status = 'excellent';
  }

  return {
    score,
    status,
    summary,
    critique,
    strengths,
    suggestions,
    matchedKeywords,
    wordCount,
  };
}

export function getScoreBadge(score: number) {
  if (score >= 80) {
    return {
      label: 'Sangat Siap Kerja',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      desc: 'Kompetensi jawaban terstruktur, relevan dengan kebutuhan industri, dan menunjukkan penguasaan materi yang matang.',
    };
  }
  if (score >= 55) {
    return {
      label: 'Cukup Siap (Perlu Pemantapan)',
      color: 'bg-amber-100 text-amber-800 border-amber-300',
      desc: 'Konsep dasar sudah baik, namun perlu memperkaya contoh kasus nyata dan terminologi teknis kejuruan.',
    };
  }
  return {
    label: 'Perlu Latihan Tambahan',
    color: 'bg-rose-100 text-rose-800 border-rose-300',
    desc: 'Jawaban masih terlalu ringkas atau belum menyentuh inti kompetensi. Disarankan konsultasi dengan Guru BK.',
  };
}

/**
 * Menghasilkan respon lisan pewawancara alami seperti HR profesional sungguhan
 * TANPA menyebutkan skor/angka teknis, memberikan apresiasi kontekstual,
 * lalu menyambung secara akurat ke nomor pertanyaan berikutnya.
 */
export function generateNaturalHRResponse(
  question: InterviewQuestion,
  feedback: AnswerFeedback,
  isLastQuestion: boolean,
  nextQuestionNumber?: number, // Nomor pertanyaan berikutnya (1-based: 2, 3, 4...)
  totalQuestions?: number
): string {
  const { status, matchedKeywords } = feedback;
  let acknowledgment = '';

  const acknowledgmentsExcellent = [
    'Penjelasan yang sangat runtut dan aplikatif. Pendekatan kerja nyata seperti ini memang sangat dibutuhkan di dunia industri.',
    'Sangat baik, inisiatif dan pemahaman teknis yang Anda paparkan sangat relevan dengan kebutuhan lapangan kerja.',
    'Luar biasa, alur tindakan dan solusi praktis yang Anda lakukan tergambar dengan sangat jelas dan terstruktur.',
  ];

  const acknowledgmentsModerate = [
    'Baik, saya mencatat poin penting dan alur tindakan yang Anda sampaikan tadi.',
    'Baik, terima kasih atas penjelasan yang cukup jelas mengenai pengalaman dan langkah Anda.',
    'Bagus, saya memahami konteks situasi dan keputusan kerja yang Anda ambil.',
  ];

  const acknowledgmentsBasic = [
    'Baik, terima kasih atas tanggapan yang telah Anda sampaikan.',
    'Baik, poin jawaban Anda sudah saya catat dengan baik.',
  ];

  if (matchedKeywords && matchedKeywords.length > 0) {
    const kwSample = matchedKeywords.slice(0, 2).join(' dan ');
    acknowledgment = `Baik, terima kasih atas penjelasannya. Menarik sekali mendengar cara Anda menerapkan ${kwSample} pada situasi tersebut.`;
  } else if (status === 'excellent') {
    acknowledgment = acknowledgmentsExcellent[Math.floor(Math.random() * acknowledgmentsExcellent.length)];
  } else if (status === 'moderate') {
    acknowledgment = acknowledgmentsModerate[Math.floor(Math.random() * acknowledgmentsModerate.length)];
  } else {
    acknowledgment = acknowledgmentsBasic[Math.floor(Math.random() * acknowledgmentsBasic.length)];
  }

  // Jika ini adalah pertanyaan terakhir dalam sesi wawancara
  if (isLastQuestion) {
    return `${acknowledgment} Seluruh rangkaian pertanyaan wawancara telah selesai. Terima kasih banyak atas partisipasi Anda, saya akan langsung siapkan ringkasan evaluasi lengkapnya.`;
  }

  // Tentukan nomor pertanyaan berikutnya secara akurat
  const targetNum = nextQuestionNumber && nextQuestionNumber > 1 ? nextQuestionNumber : 2;

  // Jika pertanyaan berikutnya adalah pertanyaan paling terakhir
  if (totalQuestions && targetNum === totalQuestions) {
    return `${acknowledgment} Nah, sekarang kita masuk ke pertanyaan terakhir (nomor ${targetNum}) ya.`;
  }

  // Variasi transisi alami antar pertanyaan
  const transitions = [
    `Nah, sekarang kita lanjutkan ke pertanyaan nomor ${targetNum} ya.`,
    `Selanjutnya, mari kita beralih ke pertanyaan nomor ${targetNum}.`,
    `Baik, kita teruskan ke pertanyaan nomor ${targetNum} ya.`,
  ];
  const transition = transitions[(targetNum - 2) % transitions.length] || transitions[0];

  return `${acknowledgment} ${transition}`;
}

/**
 * Menganalisis metrik rasa percaya diri dan kelancaran bicara dari seluruh sesi wawancara.
 * Mengukur: Kata gumam (filler words), Pacing (Words Per Minute / WPM), dan Skor Percaya Diri.
 */
export function analyzeConfidenceAndFluency(
  answers: UserInterviewAnswer[],
  totalSessionDurationSeconds: number = 0
): ConfidenceMetrics {
  if (!answers || answers.length === 0) {
    return {
      wpm: 0,
      wpmStatus: 'ideal',
      wpmDescription: 'Belum ada data rekaman bicara yang cukup.',
      fillerCount: 0,
      fillerDetails: [],
      fillerStatus: 'very-confident',
      fillerDescription: 'Belum ada gumaman terdeteksi.',
      confidenceScore: 75,
      confidenceLabel: 'Cukup Percaya Diri',
      psychologicalTip: 'Terus berlatih dengan tenang dan teratur.',
    };
  }

  // 1. Hitung total kata dari seluruh jawaban
  let totalWords = 0;
  let totalSpeakingSeconds = 0;
  const combinedText = answers.map(a => {
    const text = a.userAnswer || '';
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    totalWords += words.length;
    totalSpeakingSeconds += (a.timeSpentSeconds && a.timeSpentSeconds > 0) ? a.timeSpentSeconds : 0;
    return text;
  }).join(' ');

  // Jika durasi per soal tidak tercatat, gunakan total durasi sesi atau estimasi wajar
  if (totalSpeakingSeconds <= 0) {
    totalSpeakingSeconds = totalSessionDurationSeconds > 0 
      ? Math.max(20, totalSessionDurationSeconds * 0.7) // estimasi 70% waktu dipakai bicara
      : answers.length * 35; // estimasi 35 detik per soal
  }

  // 2. Hitung Pacing (WPM)
  const durationMinutes = Math.max(0.2, totalSpeakingSeconds / 60);
  const rawWpm = Math.round(totalWords / durationMinutes);
  // Batasi rentang WPM yang masuk akal
  const wpm = Math.max(30, Math.min(220, rawWpm));

  let wpmStatus: 'slow' | 'ideal' | 'fast' = 'ideal';
  let wpmDescription = '';

  if (wpm < 85) {
    wpmStatus = 'slow';
    wpmDescription = `Tempo bicara Anda cenderung lambat dan sangat berhati-hati (${wpm} kata/menit). Di dunia kerja, jeda yang terlalu panjang bisa disalahartikan pewawancara sebagai keraguan.`;
  } else if (wpm > 145) {
    wpmStatus = 'fast';
    wpmDescription = `Tempo bicara Anda cukup cepat dan terburu-buru (${wpm} kata/menit). Ketika cemas, kita cenderung mempercepat ucapan. Berikan jeda napas 1 detik di setiap akhir kalimat.`;
  } else {
    wpmStatus = 'ideal';
    wpmDescription = `Tempo bicara Anda sangat stabil dan ideal (${wpm} kata/menit). Ritme ini mencerminkan ketenangan, kejelasan artikulasi, dan rasa percaya diri yang matang.`;
  }

  // 3. Deteksi Kata Gumam (Filler Words) Bahasa Indonesia
  // Target: eemm, eem, umm, um, ee, anu, apa ya, kayak, ngg, hmm, yaa
  const fillerWordTargets: { pattern: RegExp; display: string }[] = [
    { pattern: /\b(e+m+|u+m+)\b/gi, display: 'eemm / umm' },
    { pattern: /\b(a+n+u+)\b/gi, display: 'anu' },
    { pattern: /\b(apa ya|gimana ya)\b/gi, display: 'apa ya' },
    { pattern: /\b(kayak|kayaknya)\b/gi, display: 'kayak' },
    { pattern: /\b(ng+g+|h+m+)\b/gi, display: 'hmm / ngg' },
    { pattern: /\b(e+)\b/gi, display: 'ee...' },
  ];

  const fillerDetails: FillerWordOccurrence[] = [];
  let totalFillers = 0;

  fillerWordTargets.forEach(({ pattern, display }) => {
    const matches = combinedText.match(pattern);
    if (matches && matches.length > 0) {
      fillerDetails.push({
        word: display,
        count: matches.length,
      });
      totalFillers += matches.length;
    }
  });

  let fillerStatus: 'very-confident' | 'moderate' | 'hesitant' = 'very-confident';
  let fillerDescription = '';

  if (totalFillers <= 2) {
    fillerStatus = 'very-confident';
    fillerDescription = `Luar biasa! Sangat minim gumaman (${totalFillers} kali terdeteksi). Ucapan Anda terdengar lugas, meyakinkan, dan profesional.`;
  } else if (totalFillers <= 6) {
    fillerStatus = 'moderate';
    fillerDescription = `Cukup baik, terdeteksi ${totalFillers} kali kata gumam saat berpikir. Cobalah mengganti gumaman seperti 'eemm' dengan jeda hening singkat (silent pause) 1 detik.`;
  } else {
    fillerStatus = 'hesitant';
    fillerDescription = `Cukup sering terdeteksi kata gumam (${totalFillers} kali). Hal ini menandakan rasa gugup saat merangkai kalimat. Tarik napas sejenak sebelum menjawab daripada mengucapkan 'anu' atau 'eemm'.`;
  }

  // 4. Hitung Skor Indeks Percaya Diri (0 - 100)
  let confidenceScore = 100;

  // Penalti filler words: maks 25 poin
  confidenceScore -= Math.min(25, totalFillers * 3.5);

  // Penalti WPM tidak ideal: maks 15 poin
  if (wpm < 85) {
    confidenceScore -= Math.min(15, Math.round((85 - wpm) * 0.3));
  } else if (wpm > 145) {
    confidenceScore -= Math.min(15, Math.round((wpm - 145) * 0.25));
  }

  // Pengaruh panjang rata-rata jawaban: jika terlalu pendek (<20 kata), kurangi 10 poin
  const avgWordsPerAnswer = totalWords / answers.length;
  if (avgWordsPerAnswer < 20) {
    confidenceScore -= 12;
  }

  confidenceScore = Math.max(45, Math.min(98, Math.round(confidenceScore)));

  // Label Percaya Diri
  let confidenceLabel = '';
  if (confidenceScore >= 85) {
    confidenceLabel = 'Sangat Percaya Diri & Mantap';
  } else if (confidenceScore >= 70) {
    confidenceLabel = 'Percaya Diri & Komunikatif';
  } else if (confidenceScore >= 55) {
    confidenceLabel = 'Cukup Baik, Perlu Pembiasaan';
  } else {
    confidenceLabel = 'Perlu Pemanasan & Relaksasi';
  }

  // 5. Tips Psikologis Spesifik
  let psychologicalTip = '';
  if (totalFillers > 4 && wpm > 145) {
    psychologicalTip = 'Gugup membuat detak jantung naik dan bicara jadi terburu-buru. Sebelum menjawab pertanyaan berikutnya, coba teknik Box Breathing (tarik napas 4 detik) dan izinkan diri Anda hening sejenak sebelum bersuara.';
  } else if (wpm < 85) {
    psychologicalTip = 'Jangan takut salah bicara. Rekruter industri lebih menghargai jawaban yang lugas dan mengalir daripada jawaban sempurna yang dipikirkan terlalu lama. Percayai keahlian praktik yang sudah Anda miliki!';
  } else if (totalFillers > 4) {
    psychologicalTip = 'Teknik "Silent Pause" adalah senjata rahasia pembicara andal: daripada mengisi keheningan dengan "eemm" atau "anu", diam sejenak sambil menatap pewawancara. Diam sejenak justru membuat Anda terlihat bijak dan berpikir matang.';
  } else {
    psychologicalTip = 'Pertahankan ketenangan dan postur tubuh yang tegak! Kombinasi tempo bicara stabil dan minim kata gumam ini membuktikan Anda siap diterjunkan langsung ke dunia industri.';
  }

  return {
    wpm,
    wpmStatus,
    wpmDescription,
    fillerCount: totalFillers,
    fillerDetails,
    fillerStatus,
    fillerDescription,
    confidenceScore,
    confidenceLabel,
    psychologicalTip,
  };
}
