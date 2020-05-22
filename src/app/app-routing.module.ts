import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout';
import { DefaultGuard } from './core/guards/default.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [DefaultGuard],
    children: [
      {path: '', redirectTo: 'appstore/list', pathMatch: 'full'},
      {
        path: 'appstore',
        loadChildren: () =>
          import('./routes/application/application.module').then(
            (module) => module.ApplicationModule
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
