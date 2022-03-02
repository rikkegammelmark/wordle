import { Injectable } from '@angular/core';
import { Statistics } from '../model/statistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor() { }

  getStatistics(): Statistics {
    return {
      total: 0,
      wins: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDist: Array(6).fill(0),
    };
  }
}
