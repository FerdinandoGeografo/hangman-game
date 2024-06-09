import { NgClass, NgTemplateOutlet, UpperCasePipe } from '@angular/common';
import {
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink, NgClass, NgTemplateOutlet, UpperCasePipe],
  template: `
    <ng-template #buttonContent>
      <ng-content select=".btn__label">
        @if(!!label()) {
        <span class="heading heading--md"> {{ label() | uppercase }} </span>
        }
      </ng-content>

      <ng-content select=".btn__icon"></ng-content>
    </ng-template>

    @if(!!routerLink()) {
    <a
      [class]="class()"
      [ngClass]="{ 'btn--icon': this.iconOnly() }"
      [routerLink]="routerLink()!"
      (click)="onClick.emit()"
    >
      <ng-container *ngTemplateOutlet="buttonContent"></ng-container>
    </a>
    } @else {
    <button
      [class]="class()"
      [ngClass]="{ 'btn--icon': this.iconOnly() }"
      (click)="onClick.emit()"
      [disabled]="disabled()"
    >
      <ng-container *ngTemplateOutlet="buttonContent"></ng-container>
    </button>
    }
  `,
  styles: `
    @use "../../../../../public/scss/abstracts/_mixins.scss" as mixins;

    .btn {
      &,
      &:link,
      &:visited {
        border: 0 none;
        outline: 0 none;
        font-family: inherit;
        text-decoration: none;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: all .4s;
      }

      &::before {
        content:"";
        position: absolute;
        inset: 0;
        background: transparent;
        transition: all .4s;
      }

      &--icon {
        background-image: var(--btn-gradient);
        border-radius: 50%;

        &::before {
          border-radius: 50%;
        }

        &-primary {
          height: 20rem;
          width: 20rem;
          box-shadow: inset 0px -4px 0px 5px #243041, inset 0px -12px 0px 11px #9D2DF5;

          &::before {
            box-shadow: inset 0px -4px 0px 5px #243041, inset 0px -12px 0px 11px #9D2DF5;
          }
        }

        &-secondary {
          height: 9.4rem;
          width: 9.4rem;
          box-shadow: inset 0px -6px 0 7px rgba(157, 45, 245, .25);

          @include mixins.respond(tablet) {
            height: 6.4rem;
            width: 6.4rem;
            }

            @include mixins.respond(phone) {
              height: 4rem;
              width: 4rem;
              box-shadow: inset 0px -5px 0 -1px rgba(157, 45, 245, .25);
          }
        }

        &:hover, &:focus, &:active {
          &::before {
            background: rgba(255, 255, 255, .25);
          }
        }
      }


      &--primary {
        background: var(--blue);
        color: var(--white);
        border-radius: 4rem;
        padding: 1.2rem 6.4rem;
        box-shadow: inset 0px -2px 0px 3px #140E66, inset 0px 1px 0px 6px #3C74FF;

        &::before {
          border-radius: 4rem;
        }

        &:hover, &:focus, &:active {
          &::before { background: transparent; }

          background: #3C74FF;
          box-shadow: inset 0px -2px 0px 3px #140E66, inset 0px 1px 0px 6px var(--blue);
        }

        @include mixins.respond(phone) {
          border-radius: 2rem;
        }
      }

      &--secondary {
        background: var(--btn-gradient);
        color: var(--white);
        border-radius: 4rem;
        padding: 1.2rem 6.4rem;
        box-shadow: inset 0px -2px 0px 3px #140E66, inset 0px 1px 0px 6px #C642FB;

        &::before {
          border-radius: 4rem;
          box-shadow: inset 0px -2px 0px 3px #140E66, inset 0px 1px 0px 6px #C642FB;
        }

        &:hover, &:focus, &:active {
          &::before {
            background: rgba(255,255,255, .25);
          }
        }
      }

      &--full {
        height: 100%;
        width: 100%;
      }

      &--keyboard {
        background: var(--white);
        color: var(--dark-navy);
        border-radius: 2.4rem;

        &:hover, &:focus, &:active {
          background: var(--blue);
          color: var(--white);
        }

        &:disabled {
          background: rgba(255,255,255,.25);
        }
      }

      &--playable {
        width: 11.2rem;
        height: 12.8rem;
        padding: 0;

        &:disabled {
          opacity: .25
        }
      }
    }
  `,
})
export class ButtonComponent {
  routerLink = input<string | null>(null);
  label = input<string | null>(null);
  disabled = model(false);
  styleClass = input<string | null>(null);

  onClick = output();

  protected class = computed(() => `btn ${this.styleClass() || ''}`);
  protected iconOnly = computed(() => !this.label());
}
