import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Router,
  NavigationEnd,
  ActivatedRoute,
  RouterOutlet
} from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TranslationService } from './core/services/translation';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
})
export class App implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private t: TranslationService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const child = this.route.firstChild;
        if (!child) return;

        const lang = child.snapshot.data['lang'] as 'en' | 'ar';
        const translations = child.snapshot.data['translations'];

        this.t.setTranslations(lang, translations);
      });
  }
}
