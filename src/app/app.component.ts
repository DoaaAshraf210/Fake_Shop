import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { HeaderService } from './Services/header.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'fakeShop';
  themeMode: any;
  currentTheme$: Observable<string>;
  constructor(
    private headerService: HeaderService,
    private _Store: Store<{ theme: string }>
  ) {
    this.currentTheme$ = this._Store.select('theme');
    this.currentTheme$.subscribe((newTheme) => {
      this.themeMode = newTheme;
    });
    headerService.setHeader('FakeShop');
    headerService.addCartLink(true);
  }
}
