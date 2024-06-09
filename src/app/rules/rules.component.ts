import { Component } from '@angular/core';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { StrokifyDirective } from '../shared/directives/strokify.directive';
import { RuleComponent } from './ui/rule/rule.component';
import { RULES } from './data/rule.const';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [ButtonComponent, StrokifyDirective, RuleComponent],
  template: `
    <section class="rules section">
      <h1 class="heading">
        <app-button styleClass="btn--icon-secondary" routerLink="../">
          <img src="images/icon-back.svg" alt="Back" class="btn__icon" />
        </app-button>

        <p class="heading heading--xl" appStrokify>How to Play</p>
      </h1>

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
})
export class RulesComponent {
  protected rules = RULES;
}
