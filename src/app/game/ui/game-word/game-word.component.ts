import { Component, computed, input } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { KeyGame } from '../../data/game.const';

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
    .word {
      margin-top: 8.8rem;
      display: flex;
      flex-wrap: wrap;
      gap: 16rem;
      row-gap: 1.6rem;
      justify-content: center;

      &__sub-word {
        display: flex;
        gap: 1.6rem;
        height: 12.8rem;
        flex-basis: 11.2rem;
      }
    }
  `,
})
export class GameWordComponent {
  word = input('');
  guessedLetters = input<KeyGame[]>([]);

  subWords = computed(() => this.word().toUpperCase().split(' '));
}