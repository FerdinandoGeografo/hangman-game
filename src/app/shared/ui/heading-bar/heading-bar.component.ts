import { Component, input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { StrokifyDirective } from '../../directives/strokify.directive';

@Component({
  selector: 'app-heading-bar',
  standalone: true,
  imports: [ButtonComponent, StrokifyDirective],
  template: `
    <h1 class="heading-bar">
      <app-button styleClass="btn--icon-secondary" routerLink="../">
        <img src="images/icon-back.svg" alt="Back" class="btn__icon" />
      </app-button>

      <p class="heading heading--xl" appStrokify>{{ heading() }}</p>
    </h1>
  `,
  styles: `
    @use "../../../../../public/scss/abstracts/_mixins.scss" as mixins;

    .heading-bar {
      display: flex;
      align-items: center;

      @include mixins.respond(phone) {
        justify-content: space-between;
      }
    }
  `,
})
export class HeadingBarComponent {
  heading = input.required<string>();
}
