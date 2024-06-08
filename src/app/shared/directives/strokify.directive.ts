import {
  AfterViewInit,
  Directive,
  ElementRef,
  Renderer2,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[appStrokify]',
  standalone: true,
})
export class StrokifyDirective implements AfterViewInit {
  #el: ElementRef<HTMLParagraphElement | HTMLHeadingElement> =
    inject(ElementRef);
  #renderer = inject(Renderer2);

  ngAfterViewInit(): void {
    const strokeText = this.#el.nativeElement.textContent;

    if (!strokeText) return;

    this.#renderer.addClass(this.#el.nativeElement, 'heading--strokify');

    this.#renderer.setAttribute(
      this.#el.nativeElement,
      'stroke-text',
      strokeText
    );
  }
}
