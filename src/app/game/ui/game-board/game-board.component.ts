import { Component, computed, input } from '@angular/core';
import { Option } from '../../../shared/models/option.model';
import { GameLetterComponent } from '../game-letter/game-letter.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [GameLetterComponent],
  template: `
    <ul class="board">
      @for(word of innerWords(); track $index;) {
      <li class="board__word-item">
        @for(letter of word.split(''); track $index) {
        <app-game-letter
          [visible]="attemptedLetters().includes(letter)"
          [letter]="letter"
        />
        }
      </li>
      }
    </ul>
  `,
  styles: `
    @use "../../../../../public/scss/abstracts/_mixins.scss" as mixins;

    .board {
      margin-top: 8.8rem;
      display: flex;
      flex-wrap: wrap;
      column-gap: 11.2rem;
      row-gap: 1.6rem;
      justify-content: center;

      @include mixins.respond(tab-land) {
        margin-top: 11.1rem;
        column-gap: 8.8rem;
      }

      @include mixins.respond(phone) {
        margin-top: 7.8rem;
        column-gap: 4rem;
        row-gap: 1.2rem;
      }

      &__word-item {
        display: flex;
        gap: 1.6rem;
        height: 12.8rem;
        overflow-x: auto;

        @include mixins.respond(tab-land) {
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
})
export class GameBoardComponent {
  selectedOption = input.required<Option['name']>();
  attemptedLetters = input<string[]>([]);

  protected innerWords = computed(() => this.selectedOption().split(' '));
}
