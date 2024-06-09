import { Component, input, output } from '@angular/core';
import { Category } from '../../../shared/data/data.service';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-game-toolbar',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <aside class="game-toolbar">
      <div class="game-toolbar__start">
        <app-button
          styleClass="btn--icon-secondary"
          (onClick)="onMenuClick.emit()"
        >
          <img class="btn__label" src="images/icon-menu.svg" alt="Back" />
        </app-button>

        <h1 class="game-toolbar__category heading heading--lg">
          {{ selectedCategory() }}
        </h1>
      </div>

      <div class="game-toolbar__end">
        <progress
          class="game-toolbar__health-bar"
          [value]="attemptsLeft()"
          min="0"
          max="8"
        ></progress>

        <img
          class="game__health-icon"
          src="images/icon-heart.svg"
          alt="Health icon"
        />
      </div>
    </aside>
  `,
  styles: `
    .game-toolbar {
      height: 10.6rem;
      display: flex;
      justify-content: space-between;

      &__start {
        display: flex;
        align-items: center;
        gap: 5.7rem;
      }

      &__category {
        color: var(--white);
      }

      &__end {
        display: flex;
        align-items: center;
        gap: 4rem;
      }

      &__health-bar {
        --health-radius: 9.6rem;
        --health-padding: .9rem 1.1rem;

        border-radius: var(--health-radius);
        height: 3.1rem;
        width: 24rem;

        &::-webkit-progress-bar {
          border-radius: var(--health-radius);
          background: var(--white);
          padding: var(--health-padding);;
        }

        &::-webkit-progress-value {
          border-radius: var(--health-radius);;
          background: var(--dark-navy);
          transition: all .4s;
        }

        &::-moz-progress-bar {
          border-radius: var(--health-radius);
          background: var(--white);
          padding: var(--health-padding);;
        }
      }

      &__health-icon {
        width: 5.3rem;
      }
    }
  `,
})
export class GameToolbarComponent {
  attemptsLeft = input.required<number>();
  selectedCategory = input.required<Category['name']>();

  onMenuClick = output();
}
