import { Component, Input } from '@angular/core';
import { ScrollAnimateDirective } from '@/shared/scroll-animate.directive';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [ScrollAnimateDirective],
  template: `
    <h2
      class="section-title gradient-text fade-up"
      scrollAnimate
    >
      {{ title }}
    </h2>
  `,
})
export class SectionTitleComponent {
  @Input() title = '';
}
