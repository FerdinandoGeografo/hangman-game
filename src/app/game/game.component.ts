import { Component, computed, inject } from '@angular/core';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { MenuComponent } from '../shared/ui/menu/menu.component';
import { DataService } from '../shared/data/data.service';
import { GameToolbarComponent } from './ui/game-toolbar/game-toolbar.component';
import { GameKeyboardComponent } from './ui/game-keyboard/game-keyboard.component';
import { GameWordComponent } from './ui/game-word/game-word.component';

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
    <section class="game">
      <app-game-toolbar
        [selectedCategory]="data.selectedCategory()!.name"
        [attemptsLeft]="data.attemptsLeft()"
        (onMenuClick)="data.openMenu$.next()"
      />

      <app-game-word
        [word]="data.currentWord()!"
        [guessedLetters]="data.guessedLetters()"
      ></app-game-word>

      <app-game-keyboard
        [guessedLetters]="data.guessedLetters()"
        (onKeyClick)="data.guessLetter.next($event)"
      />

      <app-menu
        menuStyleClass="menu--secondary"
        [overlay]="true"
        [isOpen]="data.menuOpen()"
        [header]="menuHeader()"
        [menuItems]="menuItems()"
      >
      </app-menu>
    </section>
  `,
  styles: `
    @use "../../../public/scss/abstracts/_mixins.scss" as mixins;

    .game {
      min-height: 100vh;

      position: relative;
      padding: 6rem 11.2rem 0 11.2rem;

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--bg-gradient);
        opacity: .75;
        z-index: -1;
      }

      @include mixins.respond(tablet) {
        padding: 6rem 3.2rem 0 3.2rem;
      }

      @include mixins.respond(phone) {
        padding: 4.6rem 2.55rem 0 2.55rem;
      }
    }
  `,
})
export class GameComponent {
  protected data = inject(DataService);

  menuHeader = computed(() => {
    if (this.data.gameLost()) return 'You Lose';
    if (this.data.gameWon()) return 'You Win';

    return 'Paused';
  });
  menuItems = this.data.menuItems;
}
