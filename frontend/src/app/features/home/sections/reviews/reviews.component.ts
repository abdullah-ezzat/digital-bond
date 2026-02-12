import { Component, ViewChild, ElementRef } from '@angular/core';
import { ScrollAnimateDirective } from '@/shared/scroll-animate.directive';
import { SectionTitleComponent } from '@/components/ui/section-title/section-title.component';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [ScrollAnimateDirective, SectionTitleComponent],
  templateUrl: './reviews.component.html',
})
export class ReviewsComponent {
  @ViewChild('track') track!: ElementRef<HTMLDivElement>;

  reviews = [
    {
      name: 'Mostafa',
      role: 'Business Owner',
      feedback:
        'A fantastic agency that develops strategic creative and technology to deliver on our business objectives.',
    },
    {
      name: 'Nada',
      role: 'Marketing Team Lead',
      feedback:
        'We have a growing relationship with Digital Bond and they continually bring more ideas and resources to our company.',
    },
    {
      name: 'Mohamed',
      role: 'Marketing Manager',
      feedback:
        'Wonderful agency to work with. Very technical and knowledgeable in marketing.',
    },
    {
      name: 'Menna',
      role: 'Sales Director',
      feedback:
        'They reduced our ad cost dramatically compared to our previous agency.',
    },
    {
      name: 'Asma',
      role: 'CTO',
      feedback:
        'Competent, professional, and highly engaged team.',
    },
  ];

  scrollNext() {
    const el = this.track.nativeElement;
    el.scrollBy({ left: 360, behavior: 'smooth' });
  }

  scrollPrev() {
    const el = this.track.nativeElement;
    el.scrollBy({ left: -360, behavior: 'smooth' });
  }
}
