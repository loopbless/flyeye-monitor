import { Component, OnInit } from '@angular/core';
import { NzTableData } from 'ng-zorro-antd/table';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { AlarmFormComponent } from '../form/form.component';
import { AlarmApi } from '@/apis/alarm';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alarm-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  indeterminate = false;
  checked = false;
  listData = [];
  checkeds = new Set();
  visible = false;
  pageIndex = 1;
  pageSize = 10;
  list: any[];
  total = 0;

  constructor(private drawer: NzDrawerService,
              private route: ActivatedRoute,
              private alarm: AlarmApi) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const { appId } = this.route.snapshot.queryParams;
    if (appId) {
      this.alarm.findAll(
        { appId, offset: (this.pageIndex - 1) * this.pageSize, limit: this.pageSize }
      ).subscribe(({ data, total }) => {
        this.listData = data;
        this.total = total;
      });
    }
  }

  onAllChecked($event: boolean) {

  }

  onItemChecked(id: NzTableData, $event: boolean) {

  }

  onAddAction() {
    this.drawer.create({
      nzMaskClosable: false,
      nzWidth: '45%',
      nzPlacement: 'right',
      nzTitle: '添加报警',
      nzContent: AlarmFormComponent
    });
  }

  close() {
    this.visible = false;
  }

  onUpdate(data: any) {
    this.drawer.create({
      nzMaskClosable: false,
      nzWidth: '45%',
      nzPlacement: 'right',
      nzTitle: '添加报警',
      nzContent: AlarmFormComponent,
      nzContentParams: { formData: data }
    });
  }

  onDelete(data: any) {

  }
}
