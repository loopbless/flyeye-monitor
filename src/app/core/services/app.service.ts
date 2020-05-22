import { Injectable } from '@angular/core';
import { ApplicationApi } from '@/apis/application';
import { BehaviorSubject, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  pageOffset = 0;
  pageLimit = 10;
  pageTotal = 0;
  data: any[];
  private applications$ = new BehaviorSubject(null);

  constructor(private app: ApplicationApi) {
  }

  get appData$() {
    return this.applications$.pipe(switchMap(data => {
      if(data===null) {
        return this.loadData().pipe(map(({ data: list }) => list));
      }
      return of(data);
    }), filter(data => data !== null), take(1));
  }

  loadData() {
    return this.app.findList({
      offset: this.pageOffset,
      limit: this.pageLimit
    }).pipe(tap(({ total, data }) => {
      this.data = data;
      this.applications$.next({ total, data });
      this.pageTotal = total;
    }));
  }
}
