import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SafeDomPipe } from './pipes/safe-dom.pipe';

const PIPES = [SafeDomPipe];

@NgModule({
  declarations: [...PIPES],
  imports: [
    CommonModule
  ],
  exports: [
    ...PIPES,
    CommonModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    FormsModule,
    NzBadgeModule,
    NzUploadModule,
    ReactiveFormsModule,
    NzPageHeaderModule,
    NzSelectModule,
    NzDividerModule,
    NzTabsModule,
    NzTableModule,
    NzDrawerModule,
    NzTagModule,
    NzAnchorModule,
    NzResultModule,
    NzCollapseModule,
    NzSpinModule,
    NzPaginationModule,
    NzDescriptionsModule,
    NzListModule,
    NzPopconfirmModule,
    NzModalModule
  ]
})
export class SharedModule { }
