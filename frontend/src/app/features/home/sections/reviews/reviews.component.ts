import { Component, ViewChild, ElementRef } from '@angular/core';
import { ScrollAnimateDirective } from '@/shared/scroll-animate.directive';
import { SectionTitleComponent } from '@/components/ui/section-title/section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [ScrollAnimateDirective, SectionTitleComponent],
  templateUrl: './reviews.component.html',
})
export class ReviewsComponent {
  reviews: any;
  @ViewChild('track') track!: ElementRef<HTMLDivElement>;
  constructor(private route: ActivatedRoute) {
    this.reviews = this.route.snapshot.data['reviews'];
  }

  scrollNext() {
    const el = this.track.nativeElement;
    el.scrollBy({ left: 360, behavior: 'smooth' });
  }

  scrollPrev() {
    const el = this.track.nativeElement;
    el.scrollBy({ left: -360, behavior: 'smooth' });
  }
}
