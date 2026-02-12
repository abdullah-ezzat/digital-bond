import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '@/shared/scroll-animate.directive';
import { SectionTitleComponent } from '@/components/ui/section-title/section-title.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ScrollAnimateDirective, SectionTitleComponent],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  services = [
    {
      title: 'Social Media',
      icon: '/assets/svg/services/social-media.svg',
      desc: 'High-impact content and growth strategies.',
    },
    {
      title: 'Web Development',
      icon: '/assets/svg/services/web-development.svg',
      desc: 'Modern, fast, and scalable web platforms.',
    },
    {
      title: 'Mobile Apps',
      icon: '/assets/svg/services/mobile-apps.svg',
      desc: 'Native and cross-platform mobile solutions.',
    },
    {
      title: 'SEO Optimization',
      icon: '/assets/svg/services/branding.svg',
      desc: 'Rank higher and attract the right audience.',
    },
    {
      title: 'Influencer Marketing',
      icon: '/assets/svg/services/influencers.svg',
      desc: 'Reach audiences through trusted voices.',
    },
    {
      title: 'SMS Campaigns',
      icon: '/assets/svg/services/sms.svg',
      desc: 'Direct, high-conversion messaging.',
    },
    {
      title: 'Media Production',
      icon: '/assets/svg/services/production.svg',
      desc: 'Professional video and visual content.',
    },
  ];
}
