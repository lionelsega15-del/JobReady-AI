import { InterviewQuestion, AnswerFeedback } from '../types';

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



