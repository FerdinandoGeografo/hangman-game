import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { ButtonTemplateDirective } from '../shared/directives/button-template.directive';
import { MenuComponent } from '../shared/ui/menu/menu.component';
import { MenuTemplateDirective } from '../shared/directives/menu-template.directive';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [
    ButtonComponent,
    ButtonTemplateDirective,
    MenuComponent,
    MenuTemplateDirective,
  ],
  template: `
    <section class="main-menu">
      <app-menu menuStyleClass="menu--main" [isOpen]="true">
        <img
          *appMenuTemplate="'header'"
          src="images/logo.svg"
          alt="Hangman Game Logo"
          class="main-menu__logo"
        />

        <ng-template appMenuTemplate="content">
          <app-button styleClass="btn--icon--primary" link="/categories">
            <img
              *appButtonTemplate="'icon'"
              src="images/icon-play.svg"
              alt=""
              class="main-menu__icon"
            />
          </app-button>

          <app-button styleClass="btn--primary" link="/rules">
            <span *appButtonTemplate="'label'" class="heading heading--sm"
              >HOW TO PLAY</span
            >
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
        @include mixins.respond(phone-small) {
          width: 80.5%;
        }
      }

      &__icon {
        @include mixins.respond(phone-small) {
          width: 30%;
        }
      }
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMenuComponent {}
