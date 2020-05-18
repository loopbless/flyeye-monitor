import { NgModule } from '@angular/core';

import { ApplicationRoutingModule } from './application-routing.module';
import { AppListComponent } from './list/list.component';
import { SharedModule } from '../../shared/shared.module';
import { AppProfileComponent } from './profile/profile.component';
import { AlarmModule } from '../alarm/alarm.module';


@NgModule({
  declarations: [AppListComponent, AppProfileComponent],
  imports: [
    SharedModule,
    AlarmModule,
    ApplicationRoutingModule,
  ]
})
export class ApplicationModule { }
