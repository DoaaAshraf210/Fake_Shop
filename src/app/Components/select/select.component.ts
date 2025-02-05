import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select',
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent {
  @Input() title: string = '';
  @Input() data: any = [];
  @Input() select: any = '';
  @Input() all: boolean = true;
  @Output() selectedValue = new EventEmitter();
  themeMode: any;
  currentTheme$: Observable<string>;
  constructor(private _Store: Store<{ theme: string }>) {
    this.currentTheme$ = this._Store.select('theme');
    this.currentTheme$.subscribe((newTheme) => {
      this.themeMode = newTheme;
    });
  }
  detectChange(event: any) {
    this.selectedValue.emit(event);
  }
}
