import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorListComponent } from './list/list.component';
import { MonitorComponent } from './monitor/monitor.component';


@NgModule({
  declarations: [MonitorListComponent, MonitorComponent],
  imports: [
    SharedModule,
    MonitorRoutingModule
  ]
})
export class MonitorModule { }
