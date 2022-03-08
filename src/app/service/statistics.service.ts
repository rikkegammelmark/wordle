import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
import { calculateStatistics } from '../misc/statistics-util';
import { INITIAL_STATISTICS, Statistics } from '../model/statistics';
import { Game } from './in-memory-data.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private statisticsUrl = 'api/games';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<Statistics> {
    return this.http.get<Game[]>(this.statisticsUrl).pipe(
      tap(games => console.log("getStatistics", games)),
      map(games => calculateStatistics(games)),
      catchError(err => {
        console.log(err)
        return of(INITIAL_STATISTICS);
      })
    );
  }

  updateAndGetStatistics(win: boolean, guesses: number): Observable<Statistics> {
    return this.http.post<Game>(this.statisticsUrl, {win: win, guesses: guesses}, this.httpOptions).pipe(
      tap(game => console.log("updateAndGetStatistics", game)),
      mergeMap(_ => this.getStatistics()),
      catchError(err => {
        console.log(err)
        return of(INITIAL_STATISTICS);
      })
    )
  }
}
