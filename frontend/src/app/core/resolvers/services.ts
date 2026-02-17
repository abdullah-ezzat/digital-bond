import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ServicesResolver implements Resolve<any> {
  async resolve(route: ActivatedRouteSnapshot) {
    const lang = route.data['lang'];
    if (lang === 'en') {
      return (await import('../../../assets/data/services/services.en.json')).default;
    }
    return (await import('../../../assets/data/services/services.ar.json')).default;
  }
}
