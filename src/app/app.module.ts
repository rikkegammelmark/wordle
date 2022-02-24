import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { KeyboardComponent } from './board/keyboard/keyboard.component';
import { WordComponent } from './board/word/word.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    WordComponent,
    KeyboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
