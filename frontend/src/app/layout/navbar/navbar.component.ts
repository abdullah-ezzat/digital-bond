import {
  Component,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  signal,
  computed
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslationService } from '@/core/services/translation';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  constructor(
    private t: TranslationService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  scrolled = signal(false);
  mobileOpen = signal(false);
  activeSection = signal('');
  scrollProgress = signal(0);

  currentLang = computed(() => {
    const url = this.router.url;
    return url.startsWith('/ar') ? 'ar' : 'en';
  });

  private isBrowser = false;
  private ticking = false;

  get nav() {
    return this.t.current().nav;
  }

  sections = [
    { id: 'about', label: () => this.nav?.about },
    { id: 'services', label: () => this.nav?.services },
    { id: 'reviews', label: () => this.nav?.reviews },
    { id: 'contact', label: () => this.nav?.contact }
  ];

  toggleMenu() {
    this.mobileOpen.update(v => !v);
  }

  closeMenu() {
    this.mobileOpen.set(false);
  }

  ngAfterViewInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (!this.isBrowser) return;

    this.initScrollListener();
    this.listenToFragment();
  }

  ngOnDestroy() {
    if (!this.isBrowser) return;
    window.removeEventListener('scroll', this.onScroll);
  }

  switchLang(lang: 'en' | 'ar') {
    const fragment = this.route.snapshot.fragment;
    this.router.navigate(['/', lang], {
      fragment: fragment ?? undefined,
      replaceUrl: true
    });
  }

  private listenToFragment() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {

        const fragment = this.route.snapshot.fragment;
        if (!fragment) return;

        this.scrollToSection(fragment);
      });
  }

  private scrollToSection(id: string) {
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }
      return false;
    };

    let attempts = 0;

    const interval = setInterval(() => {
      if (tryScroll() || attempts > 20) {
        clearInterval(interval);
      }
      attempts++;
    }, 50);
  }

  private initScrollListener() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    setTimeout(() => this.onScroll(), 50);
  }

  private onScroll = () => {
    if (this.ticking) return;
    this.ticking = true;

    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const doc = document.documentElement;
      const docHeight = doc.scrollHeight - doc.clientHeight;

      const progress = docHeight > 0
        ? (scrollY / docHeight) * 100
        : 0;

      this.scrollProgress.set(progress);
      this.scrolled.set(scrollY > 20);

      const viewportMiddle = scrollY + window.innerHeight / 2;
      let current = '';

      for (const section of this.sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;

        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;

        if (viewportMiddle >= top && viewportMiddle < bottom) {
          current = section.id;
          break;
        }
      }

      const firstSection = document.getElementById(this.sections[0].id);
      if (firstSection && scrollY < firstSection.offsetTop - 50) {
        current = '';
      }

      this.activeSection.set(current);
      this.ticking = false;
    });
  };
}
