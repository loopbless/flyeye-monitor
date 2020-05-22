import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { AlarmFormComponent } from './form/form.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [ListComponent, AlarmFormComponent],
  imports: [
    SharedModule,
  ],
  exports: [ListComponent],
})
export class AlarmModule { }
