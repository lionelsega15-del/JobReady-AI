import React from 'react';
import { useInterviewSession } from '../hooks/useInterviewSession';
import { FieldSelector } from '../components/interview/FieldSelector';
import { QuestionCard } from '../components/interview/QuestionCard';
import { InterviewSummary } from '../components/interview/InterviewSummary';
import { PageView } from '../types';
import { ArrowLeft } from 'lucide-react';

interface InterviewPageProps {
  onNavigate: (page: PageView) => void;
}

export const InterviewPage: React.FC<InterviewPageProps> = ({ onNavigate }) => {
  const {
    selectedFieldId,
    selectedField,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    answers,
    isCompleted,
    overallScore,
    mode,
    timerDurationSeconds,
    totalSessionDuration,
    startSession,
    submitAnswer,
    resetSession,
    restartCurrentField,
  } = useInterviewSession();

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 max-w-5xl mx-auto flex-1 flex flex-col">
      {/* Top back button if in active session */}
      {selectedFieldId && !isCompleted && (
        <div className="mb-4">
          <button
            onClick={resetSession}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Pilihan Bidang & Mode</span>
          </button>
        </div>
      )}

      {/* Screen 1: Field Selection & Mode Config */}
      {!selectedFieldId && (
        <FieldSelector 
          onSelectField={(fieldId, selectedMode, duration) => {
            startSession(fieldId, selectedMode, duration);
          }}
          onNavigateHistory={() => onNavigate('history')}
        />
      )}

      {/* Screen 2: Active Question Card */}
      {selectedFieldId && selectedField && currentQuestion && !isCompleted && (
        <QuestionCard
          question={currentQuestion}
          field={selectedField}
          currentIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          mode={mode}
          timerDurationSeconds={timerDurationSeconds}
          onSubmitAnswer={submitAnswer}
          onCancel={resetSession}
        />
      )}

      {/* Screen 3: Final Summary & Feedback Report */}
      {selectedField && isCompleted && (
        <InterviewSummary
          field={selectedField}
          answers={answers}
          overallScore={overallScore}
          mode={mode}
          totalSessionDuration={totalSessionDuration}
          onRestart={restartCurrentField}
          onSelectOtherField={resetSession}
          onGoToColorblind={() => onNavigate('colorblind')}
          onGoToHistory={() => onNavigate('history')}
        />
      )}
    </div>
  );
};
