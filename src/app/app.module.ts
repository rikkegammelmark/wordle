import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HotkeyModule } from 'angular2-hotkeys';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { KeyboardComponent } from './board/keyboard/keyboard.component';
import { StatisticsDialogComponent } from './board/statistics-dialog/statistics-dialog.component';
import { WordComponent } from './board/word/word.component';
import { InMemoryDataService } from './service/in-memory-data.service';

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
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
