import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  contentChildren,
  input,
  model,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonTemplateDirective } from '../../directives/button-template.directive';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink, NgClass, NgTemplateOutlet],
  template: `
    <ng-template #content>
      @if(labelTemplate() || label()) {
      <ng-container [ngTemplateOutlet]="labelTemplate() || defaultLabel" />
      <ng-template #defaultLabel>
        <span class="heading heading--md">{{ label() }}</span>
      </ng-template>
      } @if(iconTemplate()) {
      <ng-container [ngTemplateOutlet]="iconTemplate()!"></ng-container>
      }
    </ng-template>
  `,
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  link = input<string | null>(null);
  label = input<string | null>(null);
  disabled = model(false);
  styleClass = input<string | null>(null);

  onClick = output();

  protected buttonTemplates = contentChildren(ButtonTemplateDirective);

  protected btnClass = computed(() => `btn ${this.styleClass() || ''}`);
  protected labelTemplate = computed(
    () => this.buttonTemplates().find((el) => el.type() === 'label')?.tpl
  );
  protected iconTemplate = computed(
    () => this.buttonTemplates().find((el) => el.type() === 'icon')?.tpl
  );

  protected ngBtnClass = computed(() => ({
    'btn--icon': true,
  }));
}
