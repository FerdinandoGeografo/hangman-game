import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { MenuComponent } from '../shared/ui/menu/menu.component';
import { MenuTemplateDirective } from '../shared/directives/menu-template.directive';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [ButtonComponent, MenuComponent, MenuTemplateDirective],
  template: `
    <section class="main-menu">
      <app-menu menuStyleClass="menu--main" [isOpen]="true">
        <img
          *appMenuTemplate="'header'"
          src="images/logo.svg"
          alt="Hangman Logo"
          class="main-menu__logo"
        />

        <ng-template appMenuTemplate="content">
          <app-button styleClass="btn--icon--primary" routerLink="/categories">
            <img src="images/icon-play.svg" alt="Play" class="btn__icon" />
          </app-button>

          <app-button styleClass="btn--primary" routerLink="/rules">
            <span class="btn__label heading heading--sm">HOW TO PLAY</span>
          </app-button>
        </ng-template>
      </app-menu>
    </section>
  `,
  styles: `
    @use "../../../public/scss/abstracts/_mixins.scss" as mixins;

    .main-menu {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding-inline: 2.55rem;

      &__logo {
        @include mixins.respond(phone) {
          width: 80.5%;
        }
      }
    }

    .btn__icon {
      @include mixins.respond(phone) {
        width: 30%;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMenuComponent {}
