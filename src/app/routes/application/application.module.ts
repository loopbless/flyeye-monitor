import { NgModule } from '@angular/core';

import { ApplicationRoutingModule } from './application-routing.module';
import { AppListComponent } from './list/list.component';
import { SharedModule } from '../../shared/shared.module';
import { AppProfileComponent } from './profile/profile.component';
import { AlarmModule } from '../alarm/alarm.module';
import { AppFormComponent } from './form/form.component';
import { VersionFormComponent } from './version-form/version-form.component';
import { LayoutModule } from '@/layouts';


@NgModule({
  declarations: [AppListComponent, AppProfileComponent, AppFormComponent, VersionFormComponent],
  imports: [
    SharedModule,
    AlarmModule,
    LayoutModule,
    ApplicationRoutingModule,
  ]
})
export class ApplicationModule { }
