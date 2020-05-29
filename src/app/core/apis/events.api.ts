import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsApi {

  constructor(private http: HttpClient) {
  }

  findAll(page: { offset: number; limit: number; appId: number; tags?: string[]; currentUrl?: string}) {
    return this.http.get<any[]>(`${environment.contextPath.monitor}/events`, {
      params: page as any,
      observe: 'response'
    }).pipe(map((res => {
      return { total: parseInt(res.headers.get('X-total-count')), data: res.body as any[] };
    })));
  }
}
