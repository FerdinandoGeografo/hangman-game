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

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink, NgClass, NgTemplateOutlet, UpperCasePipe],
  template: `
    <ng-template #buttonContent>
      <ng-content select=".btn__label">
        @if(!!label()) {
        <span class="heading heading--md"> {{ label() | uppercase }} </span>
        }
      </ng-content>

      <ng-content select=".btn__icon"></ng-content>
    </ng-template>

    @if(!!routerLink()) {
    <a
      [class]="class()"
      [ngClass]="{ 'btn--icon': this.iconOnly() }"
      [routerLink]="routerLink()!"
      (click)="onClick.emit()"
    >
      <ng-container *ngTemplateOutlet="buttonContent"></ng-container>
    </a>
    } @else {
    <button
      [class]="class()"
      [ngClass]="{ 'btn--icon': this.iconOnly() }"
      (click)="onClick.emit()"
      [disabled]="disabled()"
    >
      <ng-container *ngTemplateOutlet="buttonContent"></ng-container>
    </button>
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

  protected class = computed(() => `btn ${this.styleClass() || ''}`);
  protected iconOnly = computed(() => !this.label());
}
