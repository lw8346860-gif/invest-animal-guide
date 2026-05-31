import { species, type Species } from '../data/species';
import type { Dimension } from '../data/questions';

export type Scores = {
  valuePatience: number;
  trendReaction: number;
  narrativeImagination: number;
  riskElasticity: number;
  disciplineControl: number;
};

function calculateSpeciesScores(scores: Scores, preferredStyle?: string): Record<string, number> {
  const s: Record<string, number> = {};

  s['value-ape'] = scores.valuePatience * 1.2 + scores.disciplineControl * 0.5 + (6 - scores.trendReaction) * 0.4;
  s['leader-whale'] = scores.valuePatience * 0.9 + scores.narrativeImagination * 0.45 + scores.disciplineControl * 0.55 + scores.trendReaction * 0.25;
  s['trend-bird'] = scores.trendReaction * 1.2 + scores.riskElasticity * 0.5 + (6 - scores.valuePatience) * 0.2;
  s['kline-octopus'] = scores.trendReaction * 1.15 + scores.disciplineControl * 0.45 + scores.riskElasticity * 0.25 + (6 - scores.valuePatience) * 0.25;
  s['ai-ticket-beast'] = scores.narrativeImagination * 1.2 + scores.riskElasticity * 0.7 + (6 - scores.valuePatience) * 0.25;
  s['belief-mammoth'] = scores.narrativeImagination * 1.0 + scores.valuePatience * 0.8 + scores.riskElasticity * 0.45;
  s['cycle-hyena'] = scores.valuePatience * 0.55 + scores.riskElasticity * 0.65 + scores.narrativeImagination * 0.35 + scores.trendReaction * 0.35;
  s['macro-crow'] = scores.narrativeImagination * 0.7 + scores.valuePatience * 0.35 + scores.disciplineControl * 0.35 + scores.trendReaction * 0.35 + scores.riskElasticity * 0.45;
  s['arbitrage-otter'] = scores.disciplineControl * 1.25 + (6 - scores.riskElasticity) * 0.45 + (6 - scores.trendReaction) * 0.25 + scores.valuePatience * 0.25;
  s['etf-turtle'] = scores.disciplineControl * 1.1 + scores.valuePatience * 0.55 + (6 - scores.riskElasticity) * 0.45 + (6 - scores.trendReaction) * 0.35;
  s['cashflow-hippo'] = scores.disciplineControl * 0.95 + scores.valuePatience * 0.8 + (6 - scores.riskElasticity) * 0.35 + (6 - scores.narrativeImagination) * 0.25;
  s['contrarian-hedgehog'] = scores.valuePatience * 1.05 + (6 - scores.trendReaction) * 0.65 + scores.riskElasticity * 0.35 + scores.disciplineControl * 0.25;
  s['position-gardener'] = scores.disciplineControl * 1.0 + scores.riskElasticity * 0.3 + scores.trendReaction * 0.25 + scores.valuePatience * 0.35;
  s['leverage-flamingo'] = scores.riskElasticity * 1.25 + Math.max(scores.trendReaction, scores.narrativeImagination) * 0.65 + (6 - scores.disciplineControl) * 0.35;
  s['growth-cheetah'] = scores.narrativeImagination * 1.05 + scores.trendReaction * 0.55 + scores.riskElasticity * 0.35 + scores.valuePatience * 0.25;
  s['message-mole'] = scores.trendReaction * 0.75 + scores.riskElasticity * 0.35 + (6 - scores.disciplineControl) * 0.45;

  // Style bonus
  if (preferredStyle === '趋势') { s['trend-bird'] += 0.2; s['kline-octopus'] += 0.2; }
  if (preferredStyle === '成长') { s['growth-cheetah'] += 0.2; s['ai-ticket-beast'] += 0.2; }
  if (preferredStyle === '套利') { s['arbitrage-otter'] += 0.25; }
  if (preferredStyle === '宏观') { s['macro-crow'] += 0.25; }
  if (preferredStyle === '高股息') { s['cashflow-hippo'] += 0.25; s['etf-turtle'] += 0.25; }
  if (preferredStyle === '价值') { s['value-ape'] += 0.2; s['leader-whale'] += 0.2; s['contrarian-hedgehog'] += 0.2; }
  if (preferredStyle === '我也不知道，账户自己有想法') { s['message-mole'] += 0.15; s['position-gardener'] += 0.15; }

  return s;
}

const tieBreakerPriority: Record<string, string[]> = {
  disciplineControl: ['arbitrage-otter', 'etf-turtle', 'position-gardener'],
  narrativeImagination: ['ai-ticket-beast', 'growth-cheetah', 'belief-mammoth'],
  trendReaction: ['trend-bird', 'kline-octopus'],
  valuePatience: ['value-ape', 'leader-whale', 'cashflow-hippo', 'contrarian-hedgehog'],
  riskElasticity: ['leverage-flamingo', 'cycle-hyena'],
};

export function calculateResult(answers: Record<number, number>, preferredStyle?: string): { species: Species; scores: Scores } {
  const dimensionQuestions: Record<Dimension, number[]> = {
    valuePatience: [],
    trendReaction: [],
    narrativeImagination: [],
    riskElasticity: [],
    disciplineControl: [],
  };

  // Group answers by dimension
  for (const [idStr, score] of Object.entries(answers)) {
    const id = Number(idStr);
    const dim = getDimensionForQuestion(id);
    if (dim) {
      dimensionQuestions[dim].push(score);
    }
  }

  // Calculate averages
  const scores: Scores = {
    valuePatience: average(dimensionQuestions.valuePatience),
    trendReaction: average(dimensionQuestions.trendReaction),
    narrativeImagination: average(dimensionQuestions.narrativeImagination),
    riskElasticity: average(dimensionQuestions.riskElasticity),
    disciplineControl: average(dimensionQuestions.disciplineControl),
  };

  const speciesScores = calculateSpeciesScores(scores, preferredStyle);

  // Find top species
  const sorted = Object.entries(speciesScores).sort((a, b) => b[1] - a[1]);
  const topScore = sorted[0][1];
  const threshold = 0.3;
  const candidates = sorted.filter(([, score]) => topScore - score <= threshold);

  let winnerId: string;

  if (candidates.length === 1) {
    winnerId = candidates[0][0];
  } else {
    // Tie-breaking: find highest dimension among candidates
    const dimScores: [string, number][] = [
      ['disciplineControl', scores.disciplineControl],
      ['narrativeImagination', scores.narrativeImagination],
      ['trendReaction', scores.trendReaction],
      ['valuePatience', scores.valuePatience],
      ['riskElasticity', scores.riskElasticity],
    ];
    dimScores.sort((a, b) => b[1] - a[1]);

    winnerId = candidates[0][0]; // default to highest scored
    for (const [dim] of dimScores) {
      const priority = tieBreakerPriority[dim];
      if (priority) {
        const match = priority.find(id => candidates.some(([cid]) => cid === id));
        if (match) {
          winnerId = match;
          break;
        }
      }
    }
  }

  const winner = species.find(sp => sp.id === winnerId)!;
  return { species: winner, scores };
}

function getDimensionForQuestion(id: number): Dimension | null {
  if (id >= 1 && id <= 6) return 'valuePatience';
  if (id >= 7 && id <= 12) return 'trendReaction';
  if (id >= 13 && id <= 18) return 'narrativeImagination';
  if (id >= 19 && id <= 24) return 'riskElasticity';
  if (id >= 25 && id <= 30) return 'disciplineControl';
  return null;
}

function average(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
