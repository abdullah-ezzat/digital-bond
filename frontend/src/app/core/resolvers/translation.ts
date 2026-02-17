import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TranslationResolver implements Resolve<any> {
  async resolve(route: ActivatedRouteSnapshot) {
    const lang = route.data['lang'] as 'en' | 'ar';

    if (lang === 'en') {
      return (await import('../../../assets/i18n/en.json')).default;
    }

    return (await import('../../../assets/i18n/ar.json')).default;
  }
}
