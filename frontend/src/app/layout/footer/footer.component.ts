import { TranslationService } from '@/core/services/translation';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  constructor(private t: TranslationService) {}

  get footer() {
    return this.t.current().footer;
  }
}
