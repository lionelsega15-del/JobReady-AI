import { useState, useMemo } from 'react';
import { INTERVIEW_QUESTIONS, VOCATIONAL_FIELDS } from '../data/interview-questions';
import { evaluateInterviewAnswer } from '../lib/feedback-engine';
import { UserInterviewAnswer, Field, InterviewQuestion } from '../types';

export function useInterviewSession() {
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<UserInterviewAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

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

  const startSession = (fieldId: string) => {
    setSelectedFieldId(fieldId);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  const submitAnswer = (answerText: string) => {
    if (!currentQuestion) return;

    const feedback = evaluateInterviewAnswer(currentQuestion, answerText);
    const newAnswerRecord: UserInterviewAnswer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      userAnswer: answerText,
      feedback,
    };

    const nextAnswers = [...answers, newAnswerRecord];
    setAnswers(nextAnswers);

    if (currentQuestionIndex + 1 < fieldQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const resetSession = () => {
    setSelectedFieldId(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  const restartCurrentField = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsCompleted(false);
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
    startSession,
    submitAnswer,
    resetSession,
    restartCurrentField,
  };
}
