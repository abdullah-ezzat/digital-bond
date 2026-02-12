import { TitleCasePipe } from '@angular/common';
import {
  Component,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [TitleCasePipe]
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  scrolled = false;
  mobileOpen = false;
  activeSection = '';
  scrollProgress = 0;

  sections = ['about', 'services', 'reviews', 'contact'];

  private observer!: IntersectionObserver;

  toggleMenu() {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMenu() {
    this.mobileOpen = false;
  }

  ngAfterViewInit() {
    this.initObserver();
    this.initScrollProgress();
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }

  private initObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      },
      {
        root: null,
        threshold: 0.6,
      }
    );

    this.sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    });
  }

  private initScrollProgress() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      this.scrollProgress = (scrollY / docHeight) * 100;
      this.scrolled = scrollY > 20;

      if (scrollY < window.innerHeight - 120) {
        this.activeSection = '';
      }
    });
  }
}
