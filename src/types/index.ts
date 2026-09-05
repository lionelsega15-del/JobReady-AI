export type PageView = 'home' | 'interview' | 'colorblind';

export interface Field {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  tag: string;
}

export interface InterviewQuestion {
  id: string;
  fieldId: string;
  question: string;
  contextTips: string;
  evaluatedCompetency: string;
  keywords: string[];
  sampleIdealAnswer: string;
}

export interface AnswerFeedback {
  score: number; // 0 - 100
  status: 'needs-improvement' | 'moderate' | 'excellent';
  summary: string;
  critique: string;
  strengths: string[];
  suggestions: string[];
  matchedKeywords: string[];
  wordCount: number;
}

export interface UserInterviewAnswer {
  questionId: string;
  questionText: string;
  userAnswer: string;
  feedback: AnswerFeedback;
}

export interface InterviewSessionState {
  fieldId: string;
  currentQuestionIndex: number;
  answers: UserInterviewAnswer[];
  isCompleted: boolean;
}

export interface ColorblindQuestion {
  id: string;
  plateNumber: number;
  correctAnswer: number | string;
  options: (number | string)[];
  plateType: 'demonstration' | 'transformation' | 'vanishing' | 'hidden-digit';
  diagnosisNote: string;
  paletteType: 'orange-green' | 'red-green' | 'yellow-blue' | 'blue-green';
}

export interface UserColorblindAnswer {
  questionId: string;
  plateNumber: number;
  selectedAnswer: number | string;
  correctAnswer: number | string;
  isCorrect: boolean;
}

export interface ColorblindTestResult {
  score: number;
  total: number;
  accuracyPercentage: number;
  statusCategory: 'normal' | 'partial-deficiency' | 'needs-clinical-eval';
  title: string;
  explanation: string;
  recommendation: string;
}
