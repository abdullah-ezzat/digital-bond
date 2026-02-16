import { Injectable, TransferState, Inject, PLATFORM_ID, makeStateKey } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { isPlatformServer } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ReviewsResolver implements Resolve<any> {

  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async resolve(route: ActivatedRouteSnapshot) {

    const lang = route.data['lang'];
    const key = makeStateKey<any>(`reviews-${lang}`);

    if (this.transferState.hasKey(key)) {
      const data = this.transferState.get(key, null);
      this.transferState.remove(key);
      return data;
    }

    const data = await firstValueFrom(
      this.http.get(`assets/data/reviews/reviews.${lang}.json`)
    );

    if (isPlatformServer(this.platformId)) {
      this.transferState.set(key, data);
    }

    return data;
  }
}
