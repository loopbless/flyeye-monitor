import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Chart } from '@antv/g2';
import { Router } from '@angular/router';
import { AppService } from '../../../core/services/app.service';
import { delay } from 'rxjs/operators';
import { ApplicationApi } from '@/apis/application';

@Component({
  selector: 'app-app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class AppListComponent implements OnInit, AfterViewInit {

  list: any[];

  @ViewChildren('chart') charts: QueryList<ElementRef<HTMLDivElement>>;

  constructor(private app: ApplicationApi,
              private router: Router) {
  }

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    this.app.countEvents().subscribe((data) => {
      const map = new Map();
      data.forEach((item) => {
        if (item.name) {
          if (map.has(item.name)) {
            const values = map.get(item.name);
            map.set(item.name, [...values, item]);
          } else {
            map.set(item.name, [item]);
          }
        }
      });
      this.list = Array.from(map.values());
      this.charts.changes.subscribe(list => {
        list.forEach((item, index) => {
          this.createChart(item.nativeElement, this.list[index]);
        });
      });
    });
  }

  createChart(dom: HTMLDivElement, sourceData) {

    const chart = new Chart({
      container: dom,
      height: 200,
      autoFit: true,
    });
    chart.data(sourceData);

    chart.scale({
      value: {
        alias: '访问数',
        nice: true,
      },
      nums: {
        alias: '数量',
      },
    });

    chart.tooltip({
      showMarkers: false,
      shared: true,
    });

    chart.interval()
      .position('tags*nums');
    chart.interaction('active-region');
    chart.render();
  }

  onGoTo(route: string, params?: any) {
    this.router.navigate([route], { queryParams: params });
  }

}
