import { Injectable, VERSION, Version } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationApi {
  constructor(private http: HttpClient) {
  }
  getDataTypes() {
    return of([{label: '异常', value: 'ERROR'}]);
  }

  findList(page: { offset: number; limit: number }) {
    return this.http.get(environment.contextPath.monitor + '/apps', {
      params: page as any,
      observe: 'response'
    }).pipe(map((res => {
      return {total: parseInt(res.headers.get('X-total-count')), data: res.body as any[]};
    })));
  }

  find(id) {
    return this.http.get<any>(environment.contextPath.monitor + '/apps/' + id);
  }

  insert(app: {name: string, sourceMap: File, tags?: string[]}) {
    const formData = new FormData();
    for (const key in app) {
      if(app.hasOwnProperty(key)) {
        formData.append(key, app[key]);
      }
    }
    return this.http.post<{id: number; appId: string}>(environment.contextPath.monitor + '/apps', formData);
  }

  countEvents() {
    return this.http.get<any>(environment.contextPath.monitor + '/apps/events')
  }

  findFrameworkAll() {
    return this.http.get<any[]>(environment.contextPath.monitor + '/frameworks');
  }
}
