import { TitleCasePipe, isPlatformBrowser } from '@angular/common';
import { Inject } from '@angular/core';
import {
  Component,
  AfterViewInit,
  OnDestroy,
  NgZone,
  ChangeDetectorRef,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  afterNextRender,
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  scrolled = false;
  mobileOpen = false;
  activeSection = '';
  scrollProgress = 0;

  sections = ['about', 'services', 'reviews', 'contact'];

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: Object) {}

  private observer!: IntersectionObserver;
  private destroy = false;
  private ticking = false;

  toggleMenu() {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMenu() {
    this.mobileOpen = false;
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    afterNextRender(() => {
      this.initObserver();
      this.initScrollProgress();
    });
  }

  ngOnDestroy() {
    this.destroy = true;

    if (this.observer) {
      this.observer.disconnect();
    }

    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  private initObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        let bestCandidate: string | null = null;
        let minDistance = Infinity;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const distance = Math.abs(entry.boundingClientRect.top);

          if (distance < minDistance) {
            minDistance = distance;
            bestCandidate = entry.target.id;
          }
        }

        if (bestCandidate && bestCandidate !== this.activeSection) {
          this.zone.run(() => {
            this.activeSection = bestCandidate!;
            this.cdr.markForCheck();
          });
        }
      },
      {
        threshold: 0,
        rootMargin: '-40% 0px -40% 0px',
      }
    );

    this.sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        this.observer.observe(el);
      }
    });
  }

  private initScrollProgress() {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
    });
  }

  private onScroll = () => {
    if (this.destroy) return;

    if (!this.ticking) {
      this.ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;

        const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
        const scrolled = scrollY > 20;

        if (
          progress !== this.scrollProgress ||
          scrolled !== this.scrolled
        ) {
          this.zone.run(() => {
            this.scrollProgress = progress;
            this.scrolled = scrolled;
            this.cdr.markForCheck();
          });
        }

        this.ticking = false;
      });
    }
  };
}
