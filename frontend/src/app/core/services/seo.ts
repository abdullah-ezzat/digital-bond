import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly basePath = '/digital-bond';

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  updateMeta(data: {
    title: string;
    description: string;
    image?: string;
    lang: 'en' | 'ar';
  }) {

    const origin = window.location.origin;
    const currentPath = `${origin}${this.basePath}/${data.lang}`;
    const imageUrl = data.image
      ? `${origin}${this.basePath}${data.image}`
      : undefined;

    this.title.setTitle(data.title);
    this.meta.updateTag({ name: 'description', content: data.description });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:url', content: currentPath });

    if (imageUrl) this.meta.updateTag({ property: 'og:image', content: imageUrl });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });

    if (imageUrl) this.meta.updateTag({ name: 'twitter:image', content: imageUrl });

    this.setCanonical(currentPath);
    this.setHreflang(origin);
  }

  private setCanonical(url: string) {
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement;

    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }

    link.href = url;
  }

  private setHreflang(origin: string) {
    this.removeExistingHreflang();

    const enLink = document.createElement('link');
    enLink.rel = 'alternate';
    enLink.hreflang = 'en';
    enLink.href = `${origin}${this.basePath}/en`;

    const arLink = document.createElement('link');
    arLink.rel = 'alternate';
    arLink.hreflang = 'ar';
    arLink.href = `${origin}${this.basePath}/ar`;

    document.head.appendChild(enLink);
    document.head.appendChild(arLink);
  }

  private removeExistingHreflang() {
    document
      .querySelectorAll("link[rel='alternate'][hreflang]")
      .forEach(el => el.remove());
  }
}
