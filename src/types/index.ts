export type PageView = 'home' | 'interview' | 'colorblind' | 'history';

export type InterviewMode = 'relaxed' | 'timed';

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
  timeSpentSeconds?: number;
}

export interface SavedInterviewSession {
  id: string;
  date: string; // ISO date string
  fieldId: string;
  fieldName: string;
  fieldShortName: string;
  fieldTag: string;
  fieldIcon: string;
  mode: InterviewMode;
  timerDurationSeconds?: number;
  totalQuestions: number;
  overallScore: number;
  badgeLabel: string;
  badgeColor: string;
  totalDurationSeconds: number;
  answers: UserInterviewAnswer[];
}

export interface InterviewSessionState {
  fieldId: string;
  currentQuestionIndex: number;
  answers: UserInterviewAnswer[];
  isCompleted: boolean;
  mode: InterviewMode;
  timerDurationSeconds?: number;
}

export type ColorblindMode = 'digits' | 'tracing' | 'all';

export interface PathPoint {
  x: number;
  y: number;
}

export interface ColorblindQuestion {
  id: string;
  plateNumber: number;
  category?: 'digit' | 'winding-path';
  correctAnswer: number | string;
  options: (number | string)[];
  plateType: 'demonstration' | 'transformation' | 'vanishing' | 'hidden-digit' | 'winding-path';
  diagnosisNote: string;
  paletteType: 'orange-green' | 'red-green' | 'yellow-blue' | 'blue-green';
  // Tracing mode specific fields
  instruction?: string;
  startPoint?: { x: number; y: number; label: string };
  endPoint?: { x: number; y: number; label: string };
  pathPoints?: PathPoint[];
  altPathPoints?: PathPoint[];
  pathWidth?: number;
}

export interface UserColorblindAnswer {
  questionId: string;
  plateNumber: number;
  selectedAnswer: number | string;
  correctAnswer: number | string;
  isCorrect: boolean;
  userTracedPath?: PathPoint[];
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

