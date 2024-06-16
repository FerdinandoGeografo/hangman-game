import { Component, input, model } from '@angular/core';
import { flipAnimation } from '../../../shared/animations/flip-animation';

@Component({
  selector: 'app-game-letter',
  standalone: true,
  template: `
    <div class="letter" [@flipAnimation]="visible()">
      <div class="letter__side letter__side--visible">
        <span class="letter__label heading heading--lg">
          {{ letter() }}
        </span>
      </div>
      <div class="letter__side letter__side--hidden"></div>
    </div>
  `,
  styleUrl: './game-letter.component.scss',
  animations: [flipAnimation],
})
export class GameLetterComponent {
  visible = model.required<boolean>();
  letter = input.required<string>();
}
