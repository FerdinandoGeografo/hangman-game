import { Component, input, model } from '@angular/core';
import { Letter } from '../../../shared/models/letter.model';

@Component({
  selector: 'app-game-letter',
  standalone: true,
  template: `
    <div class="letter">
      <div
        class="letter__side letter__side--visible"
        [class.show]="visible()"
        [class.hide]="!visible()"
      >
        <span class="letter__label heading heading--lg">
          {{ letter() }}
        </span>
      </div>
      <div
        class="letter__side letter__side--hidden"
        [class.show]="!visible()"
        [class.hide]="visible()"
      ></div>
    </div>
  `,
  styles: `
    @use "../../../../../public/scss/abstracts/_mixins.scss" as mixins;

    .letter {
      perspective: 150rem;
      -moz-perspective: 150rem;
      position: relative;
      height: 12.8rem;
      width: 11.2rem;

      @include mixins.respond(tablet) {
        width: 8.8rem;
        height: 11.2rem;
      }

      @include mixins.respond(phone) {
        width: 4rem;
        height: 6.6rem;
      }

      &__side {
        transition: all .4s ease;
        position: absolute;
        inset: 0;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        background: var(--blue-100);
        color: var(--white-100);
        box-shadow: var(--shadow-xs-blue), var(--shadow-md-blue);
        border-radius: 4rem;

        @include mixins.respond(tablet) {
          border-radius: 3.2rem;
        }

        @include mixins.respond(phone) {
          border-radius: 1.2rem;
        }

        &--visibile {
          background: var(--blue);
        }

        &--hidden {
          opacity: .25;
        }
      }

      .show {
        transform: rotateY(0);
      }

      .hide {
        transform: rotateY(180deg);
      }

      &__label {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        @include mixins.respond(tablet) {
          font-size: 6.4rem;
        }

        @include mixins.respond(phone) {
          font-size: 4rem;
        }
      }
    }
  `,
})
export class GameLetterComponent {
  visible = model.required<boolean>();
  letter = input.required<string>();
}
