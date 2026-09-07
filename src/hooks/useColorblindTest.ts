import { useState, useMemo } from 'react';
import { getQuestionsByMode } from '../data/colorblind-questions';
import { UserColorblindAnswer, ColorblindTestResult, ColorblindQuestion, ColorblindMode } from '../types';

export function useColorblindTest(initialMode: ColorblindMode = 'digits') {
  const [mode, setMode] = useState<ColorblindMode>(initialMode);
  const [currentPlateIndex, setCurrentPlateIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<UserColorblindAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const activeQuestions: ColorblindQuestion[] = useMemo(() => {
    return getQuestionsByMode(mode);
  }, [mode]);

  const totalPlates = activeQuestions.length;
  const currentQuestion: ColorblindQuestion | undefined = activeQuestions[currentPlateIndex];

  const progressPercentage = useMemo(() => {
    if (totalPlates === 0) return 0;
    return Math.round(((currentPlateIndex) / totalPlates) * 100);
  }, [currentPlateIndex, totalPlates]);

  const changeMode = (newMode: ColorblindMode) => {
    setMode(newMode);
    setCurrentPlateIndex(0);
    setAnswers([]);
    setIsCompleted(false);
  };

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
      setCurrentPlateIndex((prev) => prev + 1);
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
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const accuracy = totalPlates > 0 ? Math.round((correctCount / totalPlates) * 100) : 0;

    let statusCategory: 'normal' | 'partial-deficiency' | 'needs-clinical-eval' = 'normal';
    let title = 'Kemungkinan Penglihatan Warna Normal';
    let explanation = mode === 'tracing'
      ? 'Hasil penelusuran alur berliku menunjukkan Anda mampu mengenali kontinuitas gradasi warna Ishihara dengan presisi tinggi tanpa terputus.'
      : 'Hasil tes menunjukkan Anda berhasil mengenali mayoritas plat uji Ishihara dengan akurasi tinggi. Karakteristik persepsi warna spektrum merah, hijau, oranye, dan kuning berfungsi normal.';
    let recommendation = 'Kondisi ini memenuhi kriteria umum syarat administratif kejuruan teknik, kelistrikan, otomotif, maupun industri manufaktur.';

    const failureThreshold = Math.max(1, Math.round(totalPlates * 0.65));
    const partialThreshold = Math.max(1, Math.round(totalPlates * 0.85));

    if (correctCount <= failureThreshold) {
      statusCategory = 'needs-clinical-eval';
      title = 'Terindikasi Defisiensi Penglihatan Warna';
      explanation = mode === 'tracing'
        ? 'Anda mengalami kendala saat menelusuri alur berkelok pada plat tertentu. Hal ini mengindikasikan kemungkinan adanya kelemahan pembedaan rona merah-hijau.'
        : 'Anda mengalami kesulitan mengenali beberapa plat transformasi dan vanishing. Hal ini mengindikasikan kemungkinan adanya defisiensi persepsi spektrum warna merah-hijau (protan/deutan).';
      recommendation = 'Disarankan untuk melakukan pemeriksaan komprehensif ke fasilitas kesehatan atau dokter spesialis mata (Sp.M) untuk diagnosis medis resmi.';
    } else if (correctCount <= partialThreshold) {
      statusCategory = 'partial-deficiency';
      title = 'Kemungkinan Defisiensi Ringan / Parsial';
      explanation = 'Sebagian besar plat teridentifikasi dengan baik, namun terdapat alur/angka yang tidak terbaca tepat. Hal ini bisa dipengaruhi kontras layar atau defisiensi warna parsial ringan.';
      recommendation = 'Pastikan kalibrasi monitor dan pencahayaan optimal. Jika disyaratkan oleh instansi/industri tujuan, konsultasikan hasil ini dengan dokter spesialis mata.';
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
  }, [answers, totalPlates, mode]);

  return {
    mode,
    changeMode,
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
