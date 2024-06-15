import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-rule',
  standalone: true,
  imports: [UpperCasePipe],
  template: `
    <article class="rule">
      <p class="rule__step heading heading--lg">
        {{ stepLabel() }}
      </p>

      <h2 class="rule__name heading heading--md">
        {{ name() | uppercase }}
      </h2>

      <p class="rule__description paragraph">
        {{ description() }}
      </p>
    </article>
  `,
  styles: `
    @use '../../../../../public/scss/abstracts/_mixins.scss' as mixins;

    .rule {
      height: 100%;
      background: var(--white-100);
      border-radius: 4rem;
      padding: 6rem 4.8rem;
      gap: 4rem;
      display: grid;
      place-items: center;
      align-content: start;


      @include mixins.respond(tablet) {
        padding: 3.2rem 4rem;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto auto;
        row-gap: 1.6rem;
        column-gap: 4rem;
      }

      @include mixins.respond(phone) {
        border-radius: 2rem;
        padding: 3.2rem;
        column-gap: 1.6rem;
      }

      &__step {
        color: var(--blue-100);

        @include mixins.respond(tablet) {
          grid-row: 1 / -1;
        }

        @include mixins.respond(phone) {
          grid-row: 1 / 2;
        }
      }

      &__name{
        color: var(--blue-400);

        @include mixins.respond(tablet) {
          justify-self: start;
        }
      }

      &__description {
        text-align: center;
        color: var(--pink-500);

        @include mixins.respond(tablet) {
          text-align: left;
        }

        @include mixins.respond(phone) {
          grid-column: 1 / -1;
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuleComponent {
  step = input.required<number>();
  name = input.required<string>();
  description = input.required<string>();

  protected stepLabel = computed(() => `0${this.step()}`);
}
