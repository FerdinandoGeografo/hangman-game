import { Component, input, model } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-game-letter',
  standalone: true,
  imports: [NgStyle],
  template: `
    <div class="letter">
      <div
        class="letter__side letter__side--visible"
        [ngStyle]="
          visible()
            ? { transform: 'rotateY(0)' }
            : { transform: 'rotateY(180deg)' }
        "
      >
        <span class="letter__label heading heading--lg">
          {{ letter() }}
        </span>
      </div>
      <div
        class="letter__side letter__side--hidden"
        [ngStyle]="
          visible()
            ? { transform: 'rotateY(-180deg)' }
            : { transform: 'rotateY(0)' }
        "
      ></div>
    </div>
  `,
  styles: `
    @use "../../../../../public/scss/abstracts/_mixins.scss" as mixins;

    .letter {
      perspective: 50rem;
      -moz-perspective: 50rem;
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
        transition: all .4s;
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

        &--visible {
          background: var(--blue-100);
        }

        &--hidden {
          opacity: .25;
        }
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
