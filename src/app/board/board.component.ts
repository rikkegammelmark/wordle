import { Component, OnInit, ViewChild } from '@angular/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { details } from '../misc/word-util';
import { Word } from '../word';
import { WordService } from '../word.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @ViewChild('keyboard') keyboard?: any;
  @ViewChild('dummyButton') dummyButton?: any;

  goal = "";
  words = this.emptyWords();
  finished = false;
  correctLetters = [] as string[];
  current = 0;
  finishedMessage = "";

  constructor(private wordService: WordService, private hotkeysService: HotkeysService) {
    hotkeysService.add(new Hotkey('alt+shift+r', (event: KeyboardEvent) => {
      this.reset();
      return false;
    }))
  }

  ngOnInit(): void {
    this.resetGoal();
  }

  onInput = (input: string): void => {
    if (this.finished) {
      return;
    }
    this.words[this.current].value = input.toLowerCase();
    this.words[this.current].invalid = input.length === 5 && !this.wordService.isValid(input);
  }

  onEnter = (): void => {
    if (this.finished) {
      return;
    }
    this.finishWord();
  }

  finishWord() {
    const word = this.words[this.current];
    if (!this.wordService.isValid(word.value)) {
      return;
    }
    const d = details(this.goal, word.value);
    // Add details to word
    word.details = d;

    // Update keyboard
    d.split("").forEach((value, index) => {
      this.updateKeyboard(word.value[index], value);
    })

    // Is game finished?
    if (this.current === 5 || d === "ppppp") {
      this.finished = true;
      if (d === "ppppp") {
        this.finishedMessage = "Congratulations!";
      } else {
        this.finishedMessage = "Sorry the word was " + this.goal.toUpperCase();
      }
    }

    this.keyboard.clearInput();
    this.current++;
  }

  updateKeyboard(letter: string, detail: string) {
    if (this.correctLetters.includes(letter)) {
      return;
    }
    if (detail === "p") {
      this.correctLetters.push(letter);
    }
    this.keyboard.setLetterStyle(letter, detail);
  }

  reset(): void {
    console.log("Resetting")
    this.words = this.emptyWords();
    this.keyboard.clearInput();
    this.keyboard.resetStyles();
    this.finished = false;
    this.current = 0;
    this.finishedMessage = "";
    this.resetGoal();
    this.correctLetters = [] as string[];
    this.dummyButton.nativeElement.focus();
  }

  resetGoal(): void {
    this.goal = this.wordService.getRandomWord();
  }

  emptyWords(): Word[] {
    return [
      {value: "", details: "", invalid: false},
      {value: "", details: "", invalid: false},
      {value: "", details: "", invalid: false},
      {value: "", details: "", invalid: false},
      {value: "", details: "", invalid: false},
      {value: "", details: "", invalid: false},
    ];
  }
}
