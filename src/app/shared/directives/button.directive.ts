import { Directive, ElementRef, inject } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';

@Directive({
  selector: 'app-button > [appButton]',
  standalone: true,
  host: {
    '[class]': 'host.btnClass()',
    '(click)': 'host.onClick.emit()',
  },
})
export class ButtonDirective {
  protected host = inject(ButtonComponent);
}
