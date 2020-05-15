import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Chart } from '@antv/g2';
import { Router } from '@angular/router';
import { AppService } from '../../../core/services/app.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class AppListComponent implements OnInit, AfterViewInit {

  list: any[];

  @ViewChildren('chart') charts: QueryList<ElementRef<HTMLDivElement>>;

  constructor(private app: AppService,
              private router: Router) {
  }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.app.appData$.pipe(delay(0)).subscribe(({data}) => {
      this.list = data;
      this.charts.changes.subscribe(list => {
        list.forEach(item => {
          this.createChart(item.nativeElement);
        });
      });
    });
  }

  createChart(dom: HTMLDivElement) {
    const data = [
      { label: 'Api', type: 'all', value: 2800 },
      { label: 'Api', type: 'done', value: 2260 },
      { label: 'Fe', type: 'all', value: 1800 },
      { label: 'Fe', type: 'done', value: 1300 },
    ];
    const chart = new Chart({
      container: dom,
      height: 200,
      autoFit: true,
    });
    chart.data(data);

    chart.coordinate()
      .transpose()
      .scale(1, -1);

    chart.tooltip({
      showMarkers: false,
      shared: true,
    });

    chart.interval()
      .position('label*value')
      .color('type')
      .adjust([
        {
          type: 'dodge',
          marginRatio: 0,
        },
      ]);
    chart.interaction('active-region');
    chart.render();
  }

  onGoTo(route: string) {
    this.router.navigate([route]);
  }

}
