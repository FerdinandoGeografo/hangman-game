import { UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { StrokifyDirective } from '../shared/directives/strokify.directive';
import { DataService } from '../shared/data/data.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [UpperCasePipe, ButtonComponent, StrokifyDirective],
  template: `
    <section class="categories section">
      <!-- HEADING -->
      <h1 class="heading">
        <app-button styleClass="btn--icon-secondary" routerLink="../">
          <img src="images/icon-back.svg" alt="Back" class="btn__icon" />
        </app-button>

        <p class="heading heading--xl" appStrokify>Pick a Category</p>
      </h1>

      <!-- CATEGORIES -->
      <ul class="categories__list">
        @for (category of categories(); track $index) {
        <li>
          <app-button
            routerLink="/game"
            styleClass="btn--primary btn--full"
            [label]="category.name"
            (onClick)="data.selectCategory.next($index)"
          />
        </li>
        }
      </ul>
    </section>
  `,
  styles: `
    @use "../../../public/scss/abstracts/_mixins.scss" as mixins;

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

    .categories {
      &__list {
        list-style-type: none;
        margin-top: 15.5rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 19rem;
        row-gap: 5rem;
        column-gap: 3.2rem;

        @include mixins.respond(tablet) {
          margin-top: 11.4rem;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 18rem;
          gap: 3.2rem;
        }

        @include mixins.respond(phone) {
          margin-top: 10rem;
          grid-template-columns: 1fr;
          grid-auto-rows: 7.7rem;
          gap: 1.6rem;
        }
      }
    }
  `,
})
export class CategoriesComponent {
  protected data = inject(DataService);

  categories = this.data.categories;
}
