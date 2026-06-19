import { useState, useCallback, useEffect } from 'react';
import StartPage from './components/StartPage';
import ProfileForm, { type Profile } from './components/ProfileForm';
import Questionnaire from './components/Questionnaire';
import ResultPage from './components/ResultPage';
import { calculateResult } from './utils/scoring';
import type { Species } from './data/species';

type Page = 'start' | 'profile' | 'questions' | 'result';
type Theme = 'light' | 'dark';

export default function App() {
  const [page, setPage] = useState<Page>('start');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [resultSpecies, setResultSpecies] = useState<Species | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('invest-animal-theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('invest-animal-theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

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
    <div className="app-shell min-h-screen" data-theme={theme}>
      {page === 'start' && (
        <StartPage onStart={handleStart} theme={theme} onToggleTheme={toggleTheme} />
      )}
      {page === 'profile' && (
        <ProfileForm onSubmit={handleProfileSubmit} onBack={handleBackToStart} theme={theme} onToggleTheme={toggleTheme} />
      )}
      {page === 'questions' && (
        <Questionnaire onComplete={handleQuestionnaireComplete} onBack={handleBackToProfile} theme={theme} onToggleTheme={toggleTheme} />
      )}
      {page === 'result' && resultSpecies && profile && (
        <ResultPage species={resultSpecies} profile={profile} onRestart={handleRestart} />
      )}
    </div>
  );
}
