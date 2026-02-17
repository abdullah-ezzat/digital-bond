import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ReviewsResolver implements Resolve<any> {
  async resolve(route: ActivatedRouteSnapshot) {
    const lang = route.data['lang'];
    if (lang === 'en') {
      return (await import('../../../assets/data/reviews/reviews.en.json')).default;
    }
    return (await import('../../../assets/data/reviews/reviews.ar.json')).default;
  }
}
