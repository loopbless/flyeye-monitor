import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsProfileComponent } from './profile/profile.component';
import { EventsListComponent } from './list/list.component';


const routes: Routes = [
  { path: '', component: EventsListComponent },
  { path: ':id', component: EventsProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {
}
