import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  @Input() toastMessage: string = '';
  @Input() isError: boolean = false;
  @Input() onClickHandler: Function = () => {};
}
