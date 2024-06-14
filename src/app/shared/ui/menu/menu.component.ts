import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { StrokifyDirective } from '../../directives/strokify.directive';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { MenuTemplateDirective } from '../../directives/menu-template.directive';
import { MenuItem } from '../../models/menu.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ButtonComponent, StrokifyDirective, NgTemplateOutlet, NgClass],
  template: `
    @if (!overlay() || isOpen()) { @if(overlay()) {
    <div class="mask"></div>
    }
    <div [class]="menuClass()" [ngClass]="{ 'menu--overlay': this.overlay() }">
      @if(headerTemplate() || header()) {
      <div class="menu__header">
        <ng-container [ngTemplateOutlet]="headerTemplate() || defaultHeader" />

        <ng-template #defaultHeader>
          @if(!!header()) {
          <span class="heading heading--xl" appStrokify>
            {{ header() }}
          </span>
          }
        </ng-template>
      </div>
      } @if(contentTemplate() || menuItems().length > 0) {
      <div class="menu__items">
        <ng-container
          [ngTemplateOutlet]="contentTemplate() || defaultContent"
        />
        <ng-template #defaultContent>
          @for (menuItem of menuItems(); track $index) {
          <app-button
            [styleClass]="menuItem.buttonStyleClass || 'btn--primary'"
            [routerLink]="menuItem.routerLink || null"
            (onClick)="menuItem.onClick?.()"
          >
            <div class="btn__label">
              <span class="heading heading--sm">{{
                menuItem.label.toUpperCase()
              }}</span>
            </div>
          </app-button>
          }
        </ng-template>
      </div>
      }
    </div>
    }
  `,
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  header = input<string | null>(null);
  menuItems = input<MenuItem[]>([]);

  menuStyleClass = input<string | null>(null);
  overlay = input(false);

  isOpen = input(false);

  protected menuTemplates = contentChildren(MenuTemplateDirective);

  protected menuClass = computed(() => `menu ${this.menuStyleClass() || ''}`);

  protected headerTemplate = computed(
    () => this.menuTemplates().find((el) => el.type() === 'header')?.tpl
  );
  protected contentTemplate = computed(
    () => this.menuTemplates().find((el) => el.type() === 'content')?.tpl
  );
}
export { MenuItem };
