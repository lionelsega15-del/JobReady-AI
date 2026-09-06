import { useState, useMemo } from 'react';
import { INTERVIEW_QUESTIONS, VOCATIONAL_FIELDS } from '../data/interview-questions';
import { evaluateInterviewAnswer, getScoreBadge } from '../lib/feedback-engine';
import { saveInterviewSession } from '../lib/storage';
import { UserInterviewAnswer, Field, InterviewQuestion, InterviewMode, SavedInterviewSession } from '../types';

export function useInterviewSession() {
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<UserInterviewAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [mode, setMode] = useState<InterviewMode>('timed');
  const [timerDurationSeconds, setTimerDurationSeconds] = useState<number>(120); // 2 minutes default
  const [sessionStartTime, setSessionStartTime] = useState<number>(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [totalSessionDuration, setTotalSessionDuration] = useState<number>(0);

  const selectedField: Field | undefined = useMemo(() => {
    return VOCATIONAL_FIELDS.find(f => f.id === selectedFieldId);
  }, [selectedFieldId]);

  const fieldQuestions: InterviewQuestion[] = useMemo(() => {
    if (!selectedFieldId) return [];
    return INTERVIEW_QUESTIONS.filter(q => q.fieldId === selectedFieldId);
  }, [selectedFieldId]);

  const currentQuestion: InterviewQuestion | undefined = useMemo(() => {
    return fieldQuestions[currentQuestionIndex];
  }, [fieldQuestions, currentQuestionIndex]);

  const progressPercentage = useMemo(() => {
    if (fieldQuestions.length === 0) return 0;
    return Math.round(((currentQuestionIndex) / fieldQuestions.length) * 100);
  }, [currentQuestionIndex, fieldQuestions.length]);

  const startSession = (
    fieldId: string, 
    sessionMode: InterviewMode = 'timed', 
    timerDuration: number = 120
  ) => {
    setSelectedFieldId(fieldId);
    setMode(sessionMode);
    setTimerDurationSeconds(timerDuration);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsCompleted(false);
    const now = Date.now();
    setSessionStartTime(now);
    setQuestionStartTime(now);
    setTotalSessionDuration(0);
  };

  const submitAnswer = (answerText: string, customTimeSpent?: number) => {
    if (!currentQuestion) return;

    const timeSpent = customTimeSpent !== undefined 
      ? customTimeSpent 
      : Math.max(1, Math.round((Date.now() - questionStartTime) / 1000));

    const feedback = evaluateInterviewAnswer(currentQuestion, answerText);
    const newAnswerRecord: UserInterviewAnswer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      userAnswer: answerText,
      feedback,
      timeSpentSeconds: timeSpent,
    };

    const nextAnswers = [...answers, newAnswerRecord];
    setAnswers(nextAnswers);

    if (currentQuestionIndex + 1 < fieldQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuestionStartTime(Date.now());
    } else {
      const finalDuration = Math.max(1, Math.round((Date.now() - sessionStartTime) / 1000));
      setTotalSessionDuration(finalDuration);
      setIsCompleted(true);

      // Auto-save to LocalStorage
      if (selectedField) {
        const totalScore = nextAnswers.reduce((acc, curr) => acc + curr.feedback.score, 0);
        const avgScore = Math.round(totalScore / nextAnswers.length);
        const badge = getScoreBadge(avgScore);

        const savedSession: SavedInterviewSession = {
          id: `session-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          date: new Date().toISOString(),
          fieldId: selectedField.id,
          fieldName: selectedField.name,
          fieldShortName: selectedField.shortName,
          fieldTag: selectedField.tag,
          fieldIcon: selectedField.icon,
          mode,
          timerDurationSeconds: mode === 'timed' ? timerDurationSeconds : undefined,
          totalQuestions: fieldQuestions.length,
          overallScore: avgScore,
          badgeLabel: badge.label,
          badgeColor: badge.color,
          totalDurationSeconds: finalDuration,
          answers: nextAnswers,
        };
        saveInterviewSession(savedSession);
      }
    }
  };

  const resetSession = () => {
    setSelectedFieldId(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsCompleted(false);
    setTotalSessionDuration(0);
  };

  const restartCurrentField = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsCompleted(false);
    const now = Date.now();
    setSessionStartTime(now);
    setQuestionStartTime(now);
    setTotalSessionDuration(0);
  };

  const overallScore = useMemo(() => {
    if (answers.length === 0) return 0;
    const total = answers.reduce((acc, curr) => acc + curr.feedback.score, 0);
    return Math.round(total / answers.length);
  }, [answers]);

  return {
    selectedFieldId,
    selectedField,
    fieldQuestions,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions: fieldQuestions.length,
    progressPercentage,
    answers,
    isCompleted,
    overallScore,
    mode,
    setMode,
    timerDurationSeconds,
    setTimerDurationSeconds,
    totalSessionDuration,
    startSession,
    submitAnswer,
    resetSession,
    restartCurrentField,
  };
}
