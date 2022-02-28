import { Injectable } from '@angular/core';
import { WORDS } from 'src/assets/en5';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor() { }

  getRandomWord(): string {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  isValid(word: string): boolean {
    return WORDS.includes(word);
  }
}
