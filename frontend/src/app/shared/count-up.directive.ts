import {
  Directive,
  ElementRef,
  Input,
  Inject,
  PLATFORM_ID,
  signal,
  effect
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[countUp]',
  standalone: true
})
export class CountUpDirective {
  @Input({ required: true }) countUp = 0;
  @Input() duration = 1500;

  private visible = signal(false);
  private value = signal(0);

  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    effect(() => {
      this.el.nativeElement.textContent = this.value().toString();
    });
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      this.value.set(this.countUp);
      return;
    }

    this.observe();
  }

  private observe() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visible.set(true);
          observer.disconnect();
          this.animate();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(this.el.nativeElement);
  }

  private animate() {
    const startTime = performance.now();
    const start = 0;
    const end = this.countUp;

    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / this.duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = Math.floor(eased * (end - start) + start);
      this.value.set(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}
