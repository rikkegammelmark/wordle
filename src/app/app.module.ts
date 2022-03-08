import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotkeyModule } from 'angular2-hotkeys';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { KeyboardComponent } from './board/keyboard/keyboard.component';
import { StatisticsDialogComponent } from './board/statistics-dialog/statistics-dialog.component';
import { WordComponent } from './board/word/word.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    WordComponent,
    KeyboardComponent,
    StatisticsDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    CommonModule,
    HotkeyModule.forRoot(),
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
