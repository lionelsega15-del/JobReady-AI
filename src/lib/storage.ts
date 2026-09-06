import { SavedInterviewSession } from '../types';

const STORAGE_KEY = 'jobready_interview_history';

export interface HistoryStats {
  totalSessions: number;
  averageScore: number;
  highestScore: number;
  mostPracticedField: string | null;
  totalQuestionsAnswered: number;
}

/**
 * Retrieve all saved interview sessions from localStorage
 */
export function getInterviewHistory(): SavedInterviewSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return [];
  } catch (error) {
    console.error('Failed to load interview history from localStorage:', error);
    return [];
  }
}

/**
 * Save a newly completed interview session
 */
export function saveInterviewSession(session: SavedInterviewSession): SavedInterviewSession[] {
  try {
    const current = getInterviewHistory();
    // Avoid duplicate if session already exists
    const filtered = current.filter(item => item.id !== session.id);
    const updated = [session, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to save interview session to localStorage:', error);
    return getInterviewHistory();
  }
}

/**
 * Delete a specific interview session by ID
 */
export function deleteInterviewSession(id: string): SavedInterviewSession[] {
  try {
    const current = getInterviewHistory();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to delete interview session from localStorage:', error);
    return getInterviewHistory();
  }
}

/**
 * Clear all saved interview sessions
 */
export function clearAllInterviewHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear interview history from localStorage:', error);
  }
}

/**
 * Calculate statistical overview from the saved interview sessions
 */
export function getInterviewStats(sessions?: SavedInterviewSession[]): HistoryStats {
  const history = sessions || getInterviewHistory();

  if (history.length === 0) {
    return {
      totalSessions: 0,
      averageScore: 0,
      highestScore: 0,
      mostPracticedField: null,
      totalQuestionsAnswered: 0,
    };
  }

  const totalSessions = history.length;
  const totalScore = history.reduce((acc, curr) => acc + curr.overallScore, 0);
  const averageScore = Math.round(totalScore / totalSessions);
  const highestScore = Math.max(...history.map(s => s.overallScore));
  const totalQuestionsAnswered = history.reduce((acc, curr) => acc + (curr.answers?.length || curr.totalQuestions || 0), 0);

  // Find most practiced field
  const fieldCounts: Record<string, { name: string; count: number }> = {};
  history.forEach(item => {
    if (!fieldCounts[item.fieldId]) {
      fieldCounts[item.fieldId] = { name: item.fieldName, count: 0 };
    }
    fieldCounts[item.fieldId].count += 1;
  });

  let mostPracticedField: string | null = null;
  let maxCount = 0;
  Object.values(fieldCounts).forEach(item => {
    if (item.count > maxCount) {
      maxCount = item.count;
      mostPracticedField = item.name;
    }
  });

  return {
    totalSessions,
    averageScore,
    highestScore,
    mostPracticedField,
    totalQuestionsAnswered,
  };
}
