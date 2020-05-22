import { Component, OnInit } from '@angular/core';
import { MonitorReportService } from '../libs/monitor-report.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {

  constructor(private report: MonitorReportService) {
  }

  ngOnInit(): void {
    // throw new Error('Report Error!');
  }
}
