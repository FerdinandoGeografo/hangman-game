import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ALPHABET, Letter } from '../../../shared/models/letter.model';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { KeyDirective } from './key.directive';

@Component({
  selector: 'app-game-keyboard',
  standalone: true,
  imports: [ButtonComponent, KeyDirective],
  template: `
    <ul class="game-keyboard" appKey>
      @for (key of keys; track $index) {
      <app-button
        styleClass="btn--full btn--keyboard"
        [label]="key"
        [disabled]="attemptedLetters().includes(key)"
        [appKey]="key"
        (onClick)="onKeyClick.emit(key)"
      />
      }
    </ul>
  `,
  styles: `
    @use "../../../../../public/scss/abstracts/_mixins.scss" as mixins;

    .game-keyboard {
      margin-top: 12rem;
      padding-left: 2.9rem;
      list-style-type: none;
      display: grid;
      grid-template-columns: repeat(auto-fit, 10.9rem);
      gap: 2.4rem;
      grid-auto-rows: 8.4rem;

      @include mixins.respond(tab-land) {
        margin-top: 13.4rem;
        padding-left: 0;
        grid-template-columns: repeat(auto-fit, 6.4rem);
        column-gap: 1.6rem;
      }

      @include mixins.respond(phone) {
        margin-top: 11.8rem;
        grid-template-columns: repeat(auto-fit, 2.8rem);
        column-gap: 8px;
        row-gap: 2.4rem;
        grid-auto-rows: 5.6rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameKeyboardComponent {
  attemptedLetters = input.required<Letter[]>();
  protected onKeyClick = output<Letter>();

  protected keys = ALPHABET;
}
