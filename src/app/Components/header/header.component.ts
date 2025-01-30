import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  mode: any;

  constructor() {
    this.mode = localStorage.getItem('mode');
  }
  ngOnInit(): void {}

  changeMode() {
    if (localStorage.getItem('mode') == 'white') {
      localStorage.setItem('mode', 'dark');
      this.mode = 'dark';
    } else {
      localStorage.setItem('mode', 'white');
      this.mode = 'white';
    }
  }
}
