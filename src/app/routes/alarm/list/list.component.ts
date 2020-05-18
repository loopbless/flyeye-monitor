import { Component, OnInit } from '@angular/core';
import { NzTableData } from 'ng-zorro-antd';

@Component({
  selector: 'app-alarm-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  indeterminate = false;
  checked = false;
  listData = [];
  checkeds = new Set() ;
  visible = false;

  constructor() { }

  ngOnInit(): void {
  }

  onAllChecked($event: boolean) {

  }

  onItemChecked(id: NzTableData, $event: boolean) {

  }

  onCurrentPageDataChange($event: any[]) {

  }

  onAddAction() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}
