import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import Keyboard from 'simple-keyboard';

@Component({
  selector: 'app-keyboard',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './keyboard.component.html',
  styleUrls: ['../../../../node_modules/simple-keyboard/build/css/index.css', './keyboard.component.css']
})
export class KeyboardComponent {

  value = "";
  keyboard?: Keyboard;
  @Output() change = new EventEmitter<string>();
  @Output() enter = new EventEmitter<void>();

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChangeInput(input),
      onKeyPress: (button: any) => this.onKeyPress(button),
      layout: {
        'default': [
          'q w e r t y u i o p',
          'a s d f g h j k l {enter}',
          'z x c v b n m {backspace}'
        ],
      },
      display: {'{backspace}': 'backspace', '{enter}': 'enter',
      'q': 'Q', 'w': 'W', 'e': 'E', 'r': 'R', 't': 'T', 'y': 'Y', 'u': 'U', 'i': 'I',
      'o': 'O', 'p': 'P', 'a': 'A', 's': 'S', 'd': 'D', 'f': 'F', 'g': 'G', 'h': 'H',
      'j': 'J', 'k': 'K', 'l': 'L', 'z': 'Z', 'x': 'X', 'c': 'C', 'v': 'V', 'b': 'B',
      'n': 'N', 'm': 'M',
      },
      physicalKeyboardHighlight: true,
      physicalKeyboardHighlightPress: true,
    });
  }

  onKeyPress = (button: string) => {
    console.log("Key pressed", button)
    if (button === "{enter}") {
      this.enter.emit();
    }
  };

  onChangeInput = (input: string) => {
    const substring = input.substring(0, 5);
    this.keyboard?.setInput(substring);
    this.change.emit(substring);
  }

  setLetterStyle(letter: string, style: string) {
    console.log("setLetterStyle", letter, style, !!this.keyboard)
    const s = (style === "p" ? "cposition" : (style === "l" ? "cletter" : "wrong"))
    this.keyboard?.addButtonTheme(letter, s);
  }

  resetStyles() {
    this.keyboard?.setOptions({
      buttonTheme: []
    })
  }

  clearInput() {
    this.keyboard?.clearInput();
  }
}
