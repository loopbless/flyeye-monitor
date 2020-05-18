import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    SharedModule,
  ],
  exports: [ListComponent, FormComponent]
})
export class AlarmModule { }
