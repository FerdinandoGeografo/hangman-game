import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { RuleComponent } from './ui/rule/rule.component';
import { RULES } from './data/rule.const';
import { HeadingBarComponent } from '../shared/ui/heading-bar/heading-bar.component';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [ButtonComponent, HeadingBarComponent, RuleComponent],
  template: `
    <section class="rules section">
      <app-heading-bar heading="How to Play"/>

      <div class="rules__grid">
        @for (rule of rules; track $index) {
        <app-rule
          [step]="$index + 1"
          [name]="rule.name"
          [description]="rule.description"
        />
        }
      </div>
    </section>
  `,
  styles: `
    @use '../../../public/scss/abstracts/_mixins.scss' as mixins;

    .btn__icon {
      @include mixins.respond(tablet) {
        width: 2.7rem;
        margin-bottom: 1rem;
      }

      @include mixins.respond(phone) {
        width: 1.8rem;
        margin-bottom: 0.5rem;
      }
    }

    .rules {
      &__grid {
        margin-top: 6.4rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 3.2rem;

        @include mixins.respond(tablet) {
          margin-top: 10rem;
          grid-template-columns: 1fr;
        }

        @include mixins.respond(phone) {
          margin-top: 7.9rem;
          grid-template-columns: 1fr;
          gap: 2.4rem;
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RulesComponent {
  protected rules = RULES;
}
