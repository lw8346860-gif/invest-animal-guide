import { useState, useCallback } from 'react';
import StartPage from './components/StartPage';
import ProfileForm, { type Profile } from './components/ProfileForm';
import Questionnaire from './components/Questionnaire';
import ResultPage from './components/ResultPage';
import { calculateResult } from './utils/scoring';
import type { Species } from './data/species';

type Page = 'start' | 'profile' | 'questions' | 'result';

export default function App() {
  const [page, setPage] = useState<Page>('start');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [resultSpecies, setResultSpecies] = useState<Species | null>(null);

  const handleStart = useCallback(() => {
    setPage('profile');
  }, []);

  const handleProfileSubmit = useCallback((p: Profile) => {
    setProfile(p);
    setPage('questions');
  }, []);

  const handleQuestionnaireComplete = useCallback((answers: Record<number, number>) => {
    if (!profile) return;
    const { species } = calculateResult(answers, profile.style);
    setResultSpecies(species);
    setPage('result');
    window.scrollTo(0, 0);
  }, [profile]);

  const handleRestart = useCallback(() => {
    setProfile(null);
    setResultSpecies(null);
    setPage('start');
    window.scrollTo(0, 0);
  }, []);

  const handleBackToStart = useCallback(() => {
    setPage('start');
  }, []);

  const handleBackToProfile = useCallback(() => {
    setPage('profile');
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#f5f5f5' }}>
      {page === 'start' && (
        <StartPage onStart={handleStart} />
      )}
      {page === 'profile' && (
        <ProfileForm onSubmit={handleProfileSubmit} onBack={handleBackToStart} />
      )}
      {page === 'questions' && (
        <Questionnaire onComplete={handleQuestionnaireComplete} onBack={handleBackToProfile} />
      )}
      {page === 'result' && resultSpecies && profile && (
        <ResultPage species={resultSpecies} profile={profile} onRestart={handleRestart} />
      )}
    </div>
  );
}
