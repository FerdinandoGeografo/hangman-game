import { Component, input, output } from '@angular/core';
import { ALPHABET, KeyGame } from '../../data/game.const';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { debounceTime, filter, fromEvent, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-game-keyboard',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <ul class="game-keyboard" appKey>
      @for (key of keys; track $index) {
      <app-button
        styleClass="btn--full btn--keyboard"
        [label]="key"
        [disabled]="guessedLetters().includes(key)"
        (onClick)="onKeyClick.emit(key)"
      />
      }
    </ul>
  `,
  styles: `
    .game-keyboard {
      margin-top: 12rem;
      padding-left: 2.9rem;
      list-style-type: none;
      display: grid;
      grid-template-columns: repeat(auto-fit, 10.9rem);
      gap: 2.4rem;
      grid-auto-rows: 8.4rem;
    }
  `,
})
export class GameKeyboardComponent {
  guessedLetters = input<KeyGame[]>([]);
  onKeyClick = output<KeyGame>();

  keys = ALPHABET;

  handleKeyClick(event: KeyboardEvent) {
    const key = event.key.toUpperCase();
    if (this.keys.includes(key) && !this.guessedLetters().includes(key))
      this.onKeyClick.emit(key);
  }

  constructor() {
    fromEvent(document, 'keydown')
      .pipe(
        takeUntilDestroyed(),
        debounceTime(200),
        map((e) => (e as KeyboardEvent).key.toUpperCase()),
        filter(
          (key) =>
            this.keys.includes(key) && !this.guessedLetters().includes(key)
        )
      )
      .subscribe((key) => this.onKeyClick.emit(key));
  }
}