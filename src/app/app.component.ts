import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameStore } from './shared/data/game-store';
import { getState } from '@ngrx/signals';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main class="main">
      <router-outlet />
    </main>
  `,
  styles: `
    .main {}
  `,
})
export class AppComponent {
  readonly #store = inject(GameStore);

  loggerEffect = effect(() => {
    const state = getState(this.#store);
    console.log('GAME STATE CHANGED: ', state);
  });
}
