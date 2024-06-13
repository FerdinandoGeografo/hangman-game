import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { MenuComponent } from '../shared/ui/menu/menu.component';
import { GameToolbarComponent } from './ui/game-toolbar/game-toolbar.component';
import { GameKeyboardComponent } from './ui/game-keyboard/game-keyboard.component';
import { GameWordComponent } from './ui/game-word/game-word.component';
import { GlobalStore } from '../shared/data/global-store';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    ButtonComponent,
    MenuComponent,
    GameToolbarComponent,
    GameWordComponent,
    GameKeyboardComponent,
  ],
  template: `
    <section class="game section">
      <app-game-toolbar
        [selectedCategory]="store.selectedCategory()!"
        [attemptsLeft]="store.attemptsLeft()"
        (onMenuClick)="store.openMenu()"
      />

      <app-game-word
        [word]="store.selectedOption()!.toUpperCase()"
        [guessedLetters]="store.attemptedLetters()"
      ></app-game-word>

      <app-game-keyboard
        [guessedLetters]="store.attemptedLetters()"
        (onKeyClick)="store.attemptLetter($event)"
      />

      <app-menu
        menuStyleClass="menu--secondary"
        [overlay]="true"
        [isOpen]="store.menuOpen()"
        [header]="store.menuConfig.header()"
        [menuItems]="store.menuConfig.menuItems()"
      >
      </app-menu>
    </section>
  `,
  styles: `
    @use "../../../public/scss/abstracts/_mixins.scss" as mixins;

    .game {
      padding: 6rem 11.2rem 4rem 11.2rem;

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--bg-gradient);
        opacity: .75;
        z-index: -1;
      }

      @include mixins.respond(tablet) {
        padding: 6rem 3.2rem 4rem 3.2rem;
      }

      @include mixins.respond(phone) {
        padding: 4.6rem 2.55rem 3.2rem 2.55rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  readonly store = inject(GlobalStore);
}
