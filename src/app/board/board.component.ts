import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { details } from '../misc/word-util';
import { Word } from '../model/word';
import { StatisticsService } from '../service/statistics.service';
import { WordService } from '../service/word.service';
import { StatisticsDialogComponent } from './statistics-dialog/statistics-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @ViewChild('keyboard') keyboard?: any;
  @ViewChild('resetButton', { read: ElementRef }) resetButton?: any;
  @ViewChild('statisticsButton', { read: ElementRef }) statisticsButton?: any;

  goal = "";
  words = this.emptyWords();
  finished = false;
  correctLetters = [] as string[];
  current = 0;
  finishedMessage = "";

  constructor(private wordService: WordService, private hotkeysService: HotkeysService, private statisticsService: StatisticsService, public dialog: MatDialog) {
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
      this.finishGame(d === "ppppp", this.current + 1);
    }

    this.keyboard.clearInput();
    this.current++;
  }

  finishGame(win: boolean, guesses: number) {
    console.log("Finish game", win, guesses)
    this.finished = true;
    this.finishedMessage = win ? "Congratulations!" : "Sorry the word was " + this.goal.toUpperCase();
    this.openStatistics({ win: win, guesses: guesses });
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
    this.resetButton.nativeElement.blur();
    //this.dummyButton.nativeElement.focus();
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

  openStatistics(result?: { win: boolean, guesses: number }): void {
    this.statisticsButton.nativeElement.blur();
    if (result) {
      this.statisticsService.updateAndGetStatistics(result.win, result.guesses).subscribe(statistics => {
        this.dialog.open(StatisticsDialogComponent, {
          data: statistics
        })
      })
    } else {
      this.statisticsService.getStatistics().subscribe(statistics => {
        this.dialog.open(StatisticsDialogComponent, {
          data: statistics
        });
      })
    }
  }
}
