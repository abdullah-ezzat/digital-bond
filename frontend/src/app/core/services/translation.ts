import {
  Inject,
  Injectable,
  PLATFORM_ID,
  signal,
  computed
} from '@angular/core';

import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { SeoService } from './seo';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private _lang = signal<'en' | 'ar'>('en');
  private _translations = signal<any>({
    nav: {},
    hero: {},
    about: {},
    services: {},
    reviews: {},
    contact: {},
    footer: {},
    meta: {}
  });

  readonly lang = computed(() => this._lang());
  readonly current = computed(() => this._translations());

  constructor(
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  setTranslations(lang: 'en' | 'ar', data: any) {
    this._lang.set(lang);
    this._translations.set(data);

    this.updateHtml();
    this.updateSEO();
    this.updateSchema();
  }

  private updateHtml() {
    this.document.documentElement.lang = this._lang();
    this.document.documentElement.dir =
      this._lang() === 'ar' ? 'rtl' : 'ltr';
  }

  private updateSEO() {
    const t = this._translations();
    if (!t?.meta) return;

    this.seo.updateMeta({
      title: t.meta.title,
      description: t.meta.description,
      image: '/assets/logo/logo-192.webp',
      lang: this._lang()
    });
  }

  private updateSchema() {
    const t = this._translations();
    if (!t?.meta) return;

    const existing = this.document.getElementById('org-schema');
    if (existing) existing.remove();

    const origin =
      isPlatformBrowser(this.platformId)
        ? window.location.origin
        : '';

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'org-schema';

    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Digital Bond',
      url: `${origin}/digital-bond/${this._lang()}`,
      description: t.meta.description,
      logo: `${origin}/digital-bond/assets/logo/logo-192.webp`,
      sameAs: [
        'https://www.linkedin.com/company/digital-bond',
        'https://www.facebook.com/DigitalBondMena',
        'https://www.instagram.com/digitalbondmena'
      ]
    });

    this.document.head.appendChild(script);
  }
}
