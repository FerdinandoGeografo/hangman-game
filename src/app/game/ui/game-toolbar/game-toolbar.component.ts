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
          <img class="btn__icon" src="images/icon-menu.svg" alt="Back" />
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
          class="game-toolbar__health-icon"
          src="images/icon-heart.svg"
          alt="Health icon"
        />
      </div>
    </aside>
  `,
  styles: `
    @use "../../../../../public/scss/abstracts/_mixins.scss" as mixins;

    .btn__icon {
      @include mixins.respond(tablet) {
        width: 2.5rem;
      }

      @include mixins.respond(phone) {
        width: 1.6rem;
      }
    }

    .game-toolbar {
      display: flex;
      justify-content: space-between;
      gap: 1.6rem;

      @include mixins.respond(tablet) {
        padding: 0 1.6rem 0 .8rem;
      }

      @include mixins.respond(phone) {
        padding: 0;
      }

      &__start {
        display: flex;
        align-items: center;
        gap: 5.7rem;

        @include mixins.respond(tablet) {
          gap: 3.2rem;
        }

        @include mixins.respond(phone) {
          gap: 1.6rem;
        }
      }

      &__category {
        color: var(--white);

        @include mixins.respond(tablet) {
          font-size: 4.8rem;
          text-transform: uppercase;
        }

        @include mixins.respond(phone) {
          font-size: 4rem;
          text-transform: unset;
          letter-spacing: -.25px;
        }
      }

      &__end {
        display: flex;
        align-items: center;
        gap: 4rem;

        @include mixins.respond(phone) { gap: 1.6rem }
      }

      &__health-bar {
        --health-radius: 9.6rem;
        --health-padding: .9rem 1.1rem;

        border-radius: var(--health-radius);
        height: 3.1rem;
        width: 24rem;

        @include mixins.respond(tablet) {
          width: 16rem;
        }

        @include mixins.respond(phone) {
          --health-padding: 4px;
          height: 1.6rem;
          width: 5.7rem;
        }

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

        @include mixins.respond(phone) {
          width: 2.6rem;
        }
      }
    }
  `,
})
export class GameToolbarComponent {
  attemptsLeft = input.required<number>();
  selectedCategory = input.required<Category['name']>();

  onMenuClick = output();
}
