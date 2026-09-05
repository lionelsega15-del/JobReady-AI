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
