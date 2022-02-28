import { Component, Input, OnInit } from '@angular/core';
import { Word } from 'src/app/word';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {

  @Input() goal: string = "";
  @Input() word: Word = {value: "", details: "", invalid: false};

  constructor() { }

  ngOnInit(): void {
  }

  getStyles(index: number) {
    return {
      invalid: this.word.invalid,
      cposition: this.word.details[index] === 'p',
      cletter: this.word.details[index] === 'l',
      wrong: this.word.details[index] === 'w'
    }
  }
}
