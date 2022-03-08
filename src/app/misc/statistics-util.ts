import { Game, Statistics } from "../model/statistics";

export function calculateStatistics(games: Game[]): Statistics {
  const streaks = calculateStreaks(games.map(g => g.win));
  return {
    total: games.length,
    wins: games.filter(game => game.win).length,
    currentStreak: streaks[streaks.length -1],
    maxStreak: Math.max(...streaks),
    guessDist: calculateGuessDist(games.filter(g => g.win).map(g => g.guesses))
  }
}

function calculateStreaks(outcomes: boolean[]): number[] {
  return outcomes.reduce((acc, v) => {
    if (v) {
      acc[acc.length - 1]++;
    } else {
      acc.push(0);
    }
    return acc;
  }, [0])
}

function calculateGuessDist(guesses: number[]): number[] {
  return guesses.reduce((acc, v) => {
    acc[v - 1]++;
    return acc;
  }, [0, 0, 0, 0, 0, 0])
}
