import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppListComponent } from './list/list.component';
import { AppProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', component: AppListComponent },
  { path: ':id', component: AppProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule {
}
