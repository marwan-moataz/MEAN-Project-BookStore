import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() nextIsEnabled: boolean = false;
  @Input() nextBtnHandler: any = () => {};
  @Input() previousBtnHandler: Function = () => {};
}
