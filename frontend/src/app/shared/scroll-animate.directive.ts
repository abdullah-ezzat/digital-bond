import {
  Directive,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[scrollAnimate]',
  standalone: true,
})
export class ScrollAnimateDirective implements OnInit {
  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      this.el.nativeElement.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(this.el.nativeElement);
  }
}
