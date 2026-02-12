import { Component, Inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/seo/seo.service';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { ServicesComponent } from './sections/services/services.component';
import { ReviewsComponent } from './sections/reviews/reviews.component';
import { ContactComponent } from './sections/contact/contact.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    ReviewsComponent,
    ContactComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(
    private seo: SeoService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.seo.updateMeta({
      image: '/assets/logo/logo-48.webp',
      title: 'Digital Bond | Creative Digital Marketing Agency',
      description:
        'Digital Bond is a full-service digital marketing agency offering social media, web development, mobile apps, SEO, and influencer marketing.',
    });

    this.addSchema();
  }

  addSchema() {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Digital Bond',
    });

    this.document.head.appendChild(script);
  }
}
