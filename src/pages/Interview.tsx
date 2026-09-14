import React, { useState } from 'react';
import { useInterviewSession } from '../hooks/useInterviewSession';
import { FieldSelector } from '../components/interview/FieldSelector';
import { QuestionCard } from '../components/interview/QuestionCard';
import { VideoInterviewRoom } from '../components/interview/VideoInterviewRoom';
import { InterviewSummary } from '../components/interview/InterviewSummary';
import { PageView } from '../types';
import { ArrowLeft, Video, Layout } from 'lucide-react';

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

  // 'video' is the modern interactive face-to-face AI voice room, 'compact' is classic form card
  const [viewLayout, setViewLayout] = useState<'video' | 'compact'>('video');

  return (
    <div className="py-3 sm:py-4 px-3 sm:px-6 max-w-6xl mx-auto flex-1 flex flex-col">
      {/* Top control bar if in active session */}
      {selectedFieldId && !isCompleted && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={resetSession}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Pilihan Bidang & Mode</span>
          </button>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewLayout('video')}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg transition cursor-pointer ${
                viewLayout === 'video'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Mode Simulasi Wawancara Video Call Realistis"
            >
              <Video className="w-3.5 h-3.5 text-blue-600" />
              <span>Simulasi Video Call</span>
            </button>

            <button
              type="button"
              onClick={() => setViewLayout('compact')}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg transition cursor-pointer ${
                viewLayout === 'compact'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Mode Formulir Pertanyaan Klasik"
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Formulir Teks</span>
            </button>
          </div>
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

      {/* Screen 2: Active Question - Video Face-to-Face or Compact Card */}
      {selectedFieldId && selectedField && currentQuestion && !isCompleted && (
        viewLayout === 'video' ? (
          <VideoInterviewRoom
            question={currentQuestion}
            field={selectedField}
            currentIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            mode={mode}
            timerDurationSeconds={timerDurationSeconds}
            onSubmitAnswer={submitAnswer}
            onCancel={resetSession}
          />
        ) : (
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
        )
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
          onGoToHistory={() => onNavigate('history')}
        />
      )}
    </div>
  );
};
