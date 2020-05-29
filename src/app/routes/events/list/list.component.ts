import { Component, OnInit } from '@angular/core';
import { EventsApi } from '@/apis/events';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class EventsListComponent implements OnInit {

  pageIndex = 1;
  limit = 10;
  total = 0;
  list = [];
  loading = false;
  data: any = null;
  constructor(private monitor: EventsApi,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const { appId } = this.route.snapshot.queryParams;
    this.loading = true;
    this.loadData({ appId });
  }

  loadData(data?) {
    return this.monitor.findAll({
      offset: (this.pageIndex - 1) * this.limit, limit: this.limit, ...data
    }).subscribe(({ data, total }) => {
      this.list = data.map(item => ({...item, jsonData: this.objectToCodeString(item.data)}));
      this.total = total;
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  private objectToCodeString(data: any) {
    const jsonString = data ? JSON.stringify(data, null, 2) : '';
    return jsonString.replace(/"/g, '\'')
      .replace(/\s'([a-zA-Z\d]+)':/g, ' $1:');
  }

  onViewProfile(event: MouseEvent, item) {
    event.stopPropagation();
    this.data = item;
  }
}
