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

    .btn__icon {
      @include mixins.respond(tablet) {
        width: 2.7rem;
        margin-bottom: 1rem;
      }

      @include mixins.respond(phone) {
        width: 1.8rem;
        margin-bottom: 0.5rem;
      }
    }

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
