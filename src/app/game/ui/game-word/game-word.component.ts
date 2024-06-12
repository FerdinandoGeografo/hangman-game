import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { Option } from '../../../shared/models/option.model';

@Component({
  selector: 'app-game-word',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <ul class="word">
      @for (subWord of subWords(); track $index) {
      <li class="word__sub-word">
        @for (letter of subWord.split(''); track $index) {
        <app-button
          styleClass="btn--primary btn--playable"
          [disabled]="!guessedLetters().includes(letter)"
        >
          @if (guessedLetters().includes(letter)) {
          <span class="btn__label heading heading--lg">
            {{ letter }}
          </span>
          }
        </app-button>
        }
      </li>
      }
    </ul>
  `,
  styles: `
    @use "../../../../../public/scss/abstracts/_mixins.scss" as mixins;

    .btn__label {
      @include mixins.respond(tablet) {
        font-size: 6.4rem;
      }

      @include mixins.respond(phone) {
        font-size: 4rem;
      }
    }

    .word {
      margin-top: 8.8rem;
      display: flex;
      flex-wrap: wrap;
      column-gap: 11.2rem;
      row-gap: 1.6rem;
      justify-content: center;

      @include mixins.respond(tablet) {
        margin-top: 11.1rem;
        column-gap: 8.8rem;
      }

      @include mixins.respond(phone) {
        margin-top: 7.8rem;
        column-gap: 4rem;
        row-gap: 1.2rem;
      }

      &__sub-word {
        display: flex;
        gap: 1.6rem;
        height: 12.8rem;

        @include mixins.respond(tablet) {
          gap: 1.2rem;
          height: 11.2rem;
        }

        @include mixins.respond(phone) {
          gap: 8px;
          height: 6.6rem;
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameWordComponent {
  word = input.required<Option['name']>();
  guessedLetters = input<string[]>([]);

  subWords = computed(() => this.word().split(' '));
}
