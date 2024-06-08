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
    <section class="rules">
      <h1 class="rules__heading">
        <app-button styleClass="btn--icon-secondary" routerLink="../">
          <img src="images/icon-back.svg" alt="Back" class="btn btn__icon" />
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
    .rules {
      height: 100%;
      position: relative;
      padding: 8rem 11.2rem 0 11.2rem;

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--bg-gradient);
        opacity: .75;
        z-index: -1;
      }

      &__heading {
        display: flex;
        align-items: center;
      }

      &__grid {
        margin-top: 6.4rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 3.2rem;
      }
    }
  `,
})
export class RulesComponent {
  protected rules = RULES;
}
