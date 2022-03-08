import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
import { calculateStatistics } from '../misc/statistics-util';
import { Game, INITIAL_STATISTICS, Statistics } from '../model/statistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor() { }

  getStatistics(): Observable<Statistics> {
    return this.get().pipe(
      tap(games => console.log("getStatistics", games)),
      map(games => calculateStatistics(games)),
      catchError(err => {
        console.log(err)
        return of(INITIAL_STATISTICS);
      })
    );
  }

  updateAndGetStatistics(win: boolean, guesses: number): Observable<Statistics> {
    return this.post({win: win, guesses: guesses}).pipe(
      tap(game => console.log("updateAndGetStatistics", game)),
      mergeMap(_ => this.getStatistics()),
      catchError(err => {
        console.log(err)
        return of(INITIAL_STATISTICS);
      })
    )
  }

  get(): Observable<Game[]> {
    const games = this.getGames();
    return of(games);
  }

  post(game: Game): Observable<Game> {
    const games = this.getGames();
    games.push(game);
    localStorage.setItem('games', JSON.stringify(games));
    return of(game);
  }

  getGames(): Game[] {
    const games = localStorage.getItem('games');
    return games ? JSON.parse(games) : [];
  }
}
