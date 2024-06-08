import { Component, computed, signal } from '@angular/core';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { MenuComponent, MenuItem } from '../shared/ui/menu/menu.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [ButtonComponent, MenuComponent],
  template: `
    <section class="game">
      <div class="game__bar">
        <div class="game__item game__item--start">
          <app-button
            styleClass="btn--icon-secondary"
            (onClick)="this.isMenuOpen.set(true)"
          >
            <img class="btn__label" src="images/icon-menu.svg" alt="Back" />
          </app-button>

          <h1 class="heading heading--lg">Countries</h1>
        </div>

        <div class="game__item game__item--end">
          <progress class="game__health" [value]="4" min="0" max="8"></progress>

          <img
            class="game__health-icon"
            src="images/icon-heart.svg"
            alt="Health icon"
          />
        </div>
      </div>

      <ul class="game__playboard">
        @for(world of worlds(); track $index) {
        <li class="playboard__world">
          @for(letter of world.split(''); track $index) {
          <app-button styleClass="btn--primary btn--full btn--playable">
            <span class="btn__label heading heading--lg">{{
              letter.toUpperCase()
            }}</span>
          </app-button>
          }
        </li>
        }
      </ul>

      <ul class="game__keyboard">
        @for (letter of playableLetters(); track $index) {
        <li>
          <app-button styleClass="btn--full btn--keyboard" [label]="letter" />
        </li>
        }
      </ul>

      <app-menu
        menuStyleClass="menu--secondary"
        [overlay]="true"
        [isOpen]="isMenuOpen()"
        header="Paused"
        [menuItems]="menuItems"
      >
      </app-menu>
    </section>
  `,
  styles: `
    .game {
      height: 100%;
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

      &__bar {
        display: flex;
        justify-content: space-between;
      }

      &__item {
        display: flex;
        align-items: center;

        &--start {
          gap: 5.7rem;
        }

        &--end {
          gap: 4rem;
        }
      }

      .heading.heading--lg { color: var(--white); }


      &__health {
        border-radius: 9.6rem;
        height: 3.1rem;
        width: 24rem;

        &::-webkit-progress-bar {
          border-radius: 9.6rem;
          background: var(--white);
          padding: 9px 11px;
        }

        &::-webkit-progress-value {
          border-radius: 9.6rem;
          background: var(--dark-navy);
          transition: all .4s;
        }

        &::-moz-progress-bar {
          border-radius: 9.6rem;
          background: var(--white);
          padding: 9px 11px;
        }
      }

      &__health-icon {
        width: 5.3rem;
      }

      &__playboard {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(1fr min-content));
        grid-auto-rows: 12.8rem;
        row-gap: 1.6rem;
      }

      .playboard__world {
        display: grid;
        grid-template-columns: repeat(auto-fit, 11.2rem);
        column-gap: 1.6rem;
      }

      &__keyboard {
        margin-top: 5rem;
        list-style-type: none;
        display: grid;
        grid-template-columns: repeat(auto-fit, 10.9rem);
        gap: 2.4rem;
        grid-auto-rows: 8.4rem;
      }
    }
  `,
})
export class GameComponent {
  playableLetters = signal('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  randomWorld = signal('United Kingdom');
  worlds = computed(() => this.randomWorld().split(' '));

  playedLetters = signal('UNIDO');

  isMenuOpen = signal(false);

  menuItems: MenuItem[] = [
    {
      label: 'Continue',
      onClick: () => this.isMenuOpen.set(false),
      routerLink: '',
    },
    {
      label: 'New Category',
      routerLink: '/categories',
    },
    {
      label: 'Quit Game',
      onClick: () => console.log('Quit Game'),
      routerLink: '/main-menu',
      buttonStyleClass: 'btn--secondary',
    },
  ];
}
