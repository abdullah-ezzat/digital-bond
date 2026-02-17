import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '@/shared/scroll-animate.directive';
import { SectionTitleComponent } from '@/components/ui/section-title/section-title.component';
import { TranslationService } from '@/core/services/translation';
import { CountUpDirective } from '@/shared/count-up.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollAnimateDirective, SectionTitleComponent, CountUpDirective],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  constructor (private t: TranslationService) {}

  get about() {
    return this.t.current().about;
  }
}
