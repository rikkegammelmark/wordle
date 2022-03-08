import { Injectable } from '@angular/core';
import { ANSWERS } from 'src/assets/answers';
import { GUESSES } from 'src/assets/guesses';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor() { }

  getRandomWord(): string {
    return ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
  }

  isValid(word: string): boolean {
    return ANSWERS.includes(word) || GUESSES.includes(word);
  }
}
