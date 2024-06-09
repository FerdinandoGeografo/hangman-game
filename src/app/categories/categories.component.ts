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
    <section class="categories">
      <!-- HEADING -->
      <h1 class="categories__heading">
        <app-button styleClass="btn--icon-secondary" routerLink="../">
          <img src="images/icon-back.svg" alt="Back" class="btn btn__icon" />
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
    .categories {
      height: 100%;
      position: relative;
      padding: 8rem 11.2rem 0 11.2rem;

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--bg-gradient);
        opacity: .75;
        z-index: -1;
      }

      &__heading {
        display: flex;
        align-items: center;
      }

      &__list {
        list-style-type: none;
        margin-top: 15.5rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 19rem;
        row-gap: 5rem;
        column-gap: 3.2rem;
      }
    }
  `,
})
export class CategoriesComponent {
  protected data = inject(DataService);

  categories = this.data.categories;
}
