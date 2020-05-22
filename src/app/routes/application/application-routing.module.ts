import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeftNavigationLayoutComponent } from '@/layouts';
import { AppListComponent } from './list/list.component';
import { AppProfileComponent } from './profile/profile.component';
import { AppFormComponent } from './form/form.component';

const routes: Routes = [
  { path: 'list', component: AppListComponent },
  {
    path: '',
    component: LeftNavigationLayoutComponent,
    children: [
      { path: 'profile', component: AppProfileComponent },
      { path: 'new', component: AppFormComponent },
      {
        path: 'monitor',
        loadChildren: () =>
          import('../monitor/monitor.module').then(
            (module) => module.MonitorModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (module) => module.DashboardModule
          ),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule {
}
