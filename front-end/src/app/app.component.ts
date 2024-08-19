import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './shared/loader/loader.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'front-end';
  loading$: any;

  constructor(private loaderService: LoaderService) {}
  ngOnInit(): void {
    this.loading$ = this.loaderService.loading$;
  }
}
