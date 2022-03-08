import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Statistics } from 'src/app/model/statistics';

@Component({
  selector: 'app-statistics-dialog',
  templateUrl: './statistics-dialog.component.html',
  styleUrls: ['./statistics-dialog.component.css']
})
export class StatisticsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Statistics) { }

  ngOnInit(): void {
  }

}
