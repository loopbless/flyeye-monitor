import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./routes/dashboard/dashboard.module').then(
            (module) => module.DashboardModule
          ),
      },
      {
        path: 'appstore',
        loadChildren: () =>
          import('./routes/application/application.module').then(
            (module) => module.ApplicationModule
          ),
      },
      {
        path: 'monitor',
        loadChildren: () =>
          import('./routes/monitor/monitor.module').then(
            (module) => module.MonitorModule
          ),
      },
    ],
  },
  {
    path: 'passport',
    loadChildren: () =>
      import('./routes/passport/passport.module').then(
        (module) => module.PassportModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
