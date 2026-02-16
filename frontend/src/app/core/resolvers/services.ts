import {
  Injectable,
  Inject,
  PLATFORM_ID,
  TransferState,
  makeStateKey
} from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServicesResolver implements Resolve<any> {

  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async resolve(route: ActivatedRouteSnapshot) {

    const lang = route.data['lang'];
    const key = makeStateKey<any>(`services-${lang}`);

    if (this.transferState.hasKey(key)) {
      const data = this.transferState.get(key, null);
      this.transferState.remove(key);
      return data;
    }

    const data = await firstValueFrom(
      this.http.get(`assets/data/services/services.${lang}.json`)
    );

    if (isPlatformServer(this.platformId)) {
      this.transferState.set(key, data);
    }

    return data;
  }
}
