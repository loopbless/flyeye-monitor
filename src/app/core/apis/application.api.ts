import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationApi {
  constructor(private http: HttpClient) {
  }

  findList(page: { offset: number, limit: number }) {
    return this.http.get(environment.contextPath.monitor + '/apps', {
      params: page as any,
      observe: 'response'
    }).pipe(map((res => {
      return {total: parseInt(res.headers.get('X-total-count')), data: res.body as any[]};
    })));
  }

  find(id) {
    return this.http.get(environment.contextPath.monitor + '/apps/' + id);
  }
}
