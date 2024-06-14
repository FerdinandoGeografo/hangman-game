import { NgClass, NgTemplateOutlet, UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from '../../directives/button.directive';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgTemplateOutlet,
    UpperCasePipe,
    ButtonDirective,
  ],
  template: `
    @if(routerLink()) {
    <a [routerLink]="routerLink()!"> </a>
    } @else {
    <button></button>
    }
  `,
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  routerLink = input<string | null>(null);
  label = input<string | null>(null);
  disabled = model(false);
  styleClass = input<string | null>(null);

  onClick = output();

  protected btnClass = computed(() => `btn ${this.styleClass() || ''}`);
  protected iconOnly = computed(() => !this.label());
}
