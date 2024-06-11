import { Component, computed, contentChildren, input } from '@angular/core';
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
      @use "../../../../../public/scss/abstracts/_mixins.scss" as mixins;

      :host {
        max-width: 59.2rem;
        width: 100%;
      }

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
        max-width: 59.2rem;
        width: 100%;

        @include mixins.respond(phone) {
          border-radius: 4.8rem;
        }

        &--main {
          margin-top: 11rem;
          height: 50rem;

          @include mixins.respond(phone) {
            margin-top: 8rem;
            height: unset;
          }

          .menu__header {
            transform: translateY(-11rem);


            @include mixins.respond(phone) {
              transform: translateY(-5rem);
            }
          }

          .menu__items {
            padding-top: 12.9rem;
            gap: 5.8rem;

            @include mixins.respond(phone) {
              padding: 13.8rem 0 6.4rem 0;
              gap: 5.7rem;

              ::ng-deep .btn--primary {
                border-radius: 4rem;
              }
            }
          }

        }

        &--secondary {
          height: 44.5rem;

          .menu__header {
            transform: translateY(-7.2rem);

            @include mixins.respond(phone) {
              transform: translateY(-6.1rem);
            }
          }

          .menu__items {
            padding-top: 12rem;
            gap: 3.4rem;

            @include mixins.respond(phone) {
              padding-top: 10.4rem;

              ::ng-deep .btn--primary {
                border-radius: 4rem;
              }
            }
          }
        }

        &--overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;

          @include mixins.respond(phone) {
            left: 2.55rem;
            right: 2.55rem;
            width: unset;
            transform: translate(0, -50%);
          }
        }

        &__header {
          position: absolute;
          inset: 0 0 auto 0;
          display: flex;
          justify-content: center;

          .heading--xl {
            @include mixins.respond(tablet) {
              font-size: 13.6rem;
              letter-spacing: -1.3px;
            }

            @include mixins.respond(phone) {
              font-size: 9.4rem;
            }
          }
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
