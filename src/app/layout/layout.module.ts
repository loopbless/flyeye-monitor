import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [DefaultLayoutComponent],
  imports: [
    SharedModule,
    NzLayoutModule,
    RouterModule,
    NzDropDownModule,
    NzAvatarModule,
    NzMenuModule,
  ],
  exports: [DefaultLayoutComponent]
})
export class LayoutModule { }
