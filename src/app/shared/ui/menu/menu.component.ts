import {
  Component,
  computed,
  contentChildren,
  input,
  model,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { StrokifyDirective } from '../../directives/strokify.directive';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { MenuTemplateDirective } from '../../directives/menu-template.directive';

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
            [routerLink]="menuItem.routerLink"
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
  styles: `
      .mask {
        position: absolute;
        inset: 0;
        background: var(--bg-gradient);
        opacity: .75;
        z-index: 1;
      }

      .menu {
        background: var(--menu-gradient);
        border-radius: 7.2rem;
        box-shadow: inset 0 -8px 0 4px #140E66, inset 0 6px 0 8px #2463FF;
        position: relative;
        width: 59.2rem;

        &--main {
          margin-top: 11rem;
          height: 50rem;

          .menu__items {
            padding-top: 12.9rem;
            gap: 5.8rem;
          }
        }

        &--secondary {
          height: 44.5rem;

          .menu__items {
            padding-top: 12rem;
            gap: 3.4rem;
          }
        }

        &--overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
        }

        &__header {
          position: absolute;
          inset: 0 0 auto 0;
          transform: translateY(-11rem);
          display: flex;
          justify-content: center;
        }

        &__items {
          list-style-type: none;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }

  `,
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

export interface MenuItem {
  label: string;
  routerLink: string;
  onClick?: () => void;
  buttonStyleClass?: string;
  visible: boolean;
}
