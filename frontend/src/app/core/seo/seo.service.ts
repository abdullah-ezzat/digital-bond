import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(private meta: Meta, private title: Title) {}

  updateMeta(data: {
    title: string;
    description: string;
    image?: string;
    url?: string;
  }) {
    this.title.setTitle(data.title);

    this.meta.updateTag({
      name: 'description',
      content: data.description,
    });

    this.meta.updateTag({
      property: 'og:title',
      content: data.title,
    });

    this.meta.updateTag({
      property: 'og:description',
      content: data.description,
    });

    if (data.image) {
      this.meta.updateTag({
        property: 'og:image',
        content: data.image,
      });
    }

    if (data.url) {
      this.meta.updateTag({
        property: 'og:url',
        content: data.url,
      });
    }
  }
}
