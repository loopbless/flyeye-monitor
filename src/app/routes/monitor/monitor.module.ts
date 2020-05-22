import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorListComponent } from './list/list.component';
import { MonitorComponent } from './monitor/monitor.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';

@NgModule({
  declarations: [MonitorListComponent, MonitorComponent],
  imports: [
    SharedModule,
    CodemirrorModule,
    MonitorRoutingModule,
  ]
})
export class MonitorModule {
}
