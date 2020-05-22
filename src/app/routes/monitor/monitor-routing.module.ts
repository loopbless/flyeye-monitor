import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorListComponent } from './list/list.component';


const routes: Routes = [
  { path: '', component: MonitorListComponent },
  { path: ':id', component: MonitorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule {
}
