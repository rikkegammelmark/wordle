export interface Statistics {
  total: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  guessDist: number[];
}

export const INITIAL_STATISTICS: Statistics = {
  total: 0,
  wins: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDist: Array(6).fill(0),
}
