import { useState, useMemo } from 'react';
import { COLORBLIND_QUESTIONS } from '../data/colorblind-questions';
import { UserColorblindAnswer, ColorblindTestResult, ColorblindQuestion } from '../types';

export function useColorblindTest() {
  const [currentPlateIndex, setCurrentPlateIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<UserColorblindAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const totalPlates = COLORBLIND_QUESTIONS.length;
  const currentQuestion: ColorblindQuestion | undefined = COLORBLIND_QUESTIONS[currentPlateIndex];

  const progressPercentage = useMemo(() => {
    return Math.round(((currentPlateIndex) / totalPlates) * 100);
  }, [currentPlateIndex, totalPlates]);

  const submitAnswer = (selected: number | string) => {
    if (!currentQuestion) return;

    const isCorrect = String(selected).trim().toLowerCase() === String(currentQuestion.correctAnswer).trim().toLowerCase();

    const answerRecord: UserColorblindAnswer = {
      questionId: currentQuestion.id,
      plateNumber: currentQuestion.plateNumber,
      selectedAnswer: selected,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
    };

    const nextAnswers = [...answers, answerRecord];
    setAnswers(nextAnswers);

    if (currentPlateIndex + 1 < totalPlates) {
      setCurrentPlateIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const resetTest = () => {
    setCurrentPlateIndex(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  const result: ColorblindTestResult = useMemo(() => {
    const correctCount = answers.filter(a => a.isCorrect).length;
    const accuracy = totalPlates > 0 ? Math.round((correctCount / totalPlates) * 100) : 0;

    let statusCategory: 'normal' | 'partial-deficiency' | 'needs-clinical-eval' = 'normal';
    let title = 'Kemungkinan Penglihatan Warna Normal';
    let explanation = 'Hasil tes menunjukkan Anda berhasil mengenali mayoritas plat uji Ishihara dengan akurasi tinggi. Karakteristik persepsi warna spektrum merah, hijau, oranye, dan kuning berfungsi normal.';
    let recommendation = 'Kondisi ini memenuhi kriteria umum syarat administratif kejuruan teknik, kelistrikan, otomotif, maupun industri kreatif.';

    if (correctCount <= 6) {
      statusCategory = 'needs-clinical-eval';
      title = 'Terindikasi Defisiensi Penglihatan Warna';
      explanation = 'Anda mengalami kesulitan mengenali beberapa plat transformasi dan vanishing. Hal ini mengindikasikan kemungkinan adanya defisiensi persepsi spektrum warna merah-hijau (protan/deutan).';
      recommendation = 'Disarankan untuk melakukan pemeriksaan komprehensif ke fasilitas kesehatan atau dokter spesialis mata (Sp.M) untuk diagnosis medis resmi.';
    } else if (correctCount <= 8) {
      statusCategory = 'partial-deficiency';
      title = 'Kemungkinan Defisiensi Ringan / Parsial';
      explanation = 'Sebagian besar plat terbaca dengan baik, namun terdapat 2–3 plat yang tidak teridentifikasi tepat. Kondisi ini dapat dipengaruhi kontras layar, pencahayaan ruangan, atau defisiensi warna parsial ringan.';
      recommendation = 'Pastikan kalibrasi monitor dan pencahayaan ruangan optimal. Jika disyaratkan oleh industri tujuan, konsultasikan hasil ini dengan tenaga medis optometri.';
    }

    return {
      score: correctCount,
      total: totalPlates,
      accuracyPercentage: accuracy,
      statusCategory,
      title,
      explanation,
      recommendation,
    };
  }, [answers, totalPlates]);

  return {
    currentPlateIndex,
    currentQuestion,
    totalPlates,
    progressPercentage,
    answers,
    isCompleted,
    result,
    submitAnswer,
    resetTest,
  };
}
