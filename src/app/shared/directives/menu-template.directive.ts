import { Directive, TemplateRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appMenuTemplate]',
  standalone: true,
})
export class MenuTemplateDirective {
  tpl = inject(TemplateRef);
  type = input.required<MenuTemplateType>({ alias: 'appMenuTemplate' });
}

export type MenuTemplateType = 'header' | 'content';
