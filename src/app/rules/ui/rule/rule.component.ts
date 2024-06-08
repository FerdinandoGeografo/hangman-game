import { UpperCasePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rule',
  standalone: true,
  imports: [UpperCasePipe],
  template: `
    <article class="rule flex flex--column flex--center">
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
    .rule {
      height: 100%;
      background: var(--white);
      border-radius: 4rem;
      padding: 6rem 4.8rem;
      gap: 4rem;

      &__step {
        color: var(--blue);
      }

      &__name{
        color: var(--dark-navy);
      }

      &__description {
        text-align: center;
        color: #887DC0;
      }
    }
  `,
})
export class RuleComponent {
  step = input.required<number>();
  name = input.required<string>();
  description = input.required<string>();

  stepLabel = computed(() => `0${this.step()}`);
}
