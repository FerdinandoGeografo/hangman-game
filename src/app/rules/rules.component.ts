import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeadingBarComponent } from '../shared/ui/heading-bar/heading-bar.component';
import { RuleComponent } from './ui/rule/rule.component';
import { Rule } from '../shared/models/rule.model';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [HeadingBarComponent, RuleComponent],
  template: `
    <section class="rules section">
      <app-heading-bar heading="How to Play" />

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

    .rules {
      &__grid {
        margin-top: 6.4rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 3.2rem;

        @include mixins.respond(desktop-big) {
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
  protected rules: Rule[] = [
    {
      name: 'Choose a category',
      description:
        'First, choose a word category, like animals or movies. The computer then randomly selects a secret word from that topic and shows you blanks for each letter of the word.',
    },
    {
      name: 'Guess letters',
      description:
        'Take turns guessing letters. The computer fills in the relevant blank spaces if your guess is correct. If it’s wrong, you lose some health, which empties after eight incorrect guesses.',
    },
    {
      name: 'Win or lose',
      description:
        'You win by guessing all the letters in the word before your health runs out. If the health bar empties before you guess the word, you lose.',
    },
  ];
}
