import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '@/shared/scroll-animate.directive';
import { SectionTitleComponent } from '@/components/ui/section-title/section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ScrollAnimateDirective, SectionTitleComponent],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  services: any;
  constructor(private route: ActivatedRoute) {
    this.services = this.route.snapshot.data['services'];
  }
}
