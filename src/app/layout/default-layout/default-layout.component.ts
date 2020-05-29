import { Component, OnInit } from '@angular/core';
import { PassportService } from '../../core/services/passport.service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.less']
})
export class DefaultLayoutComponent implements OnInit {

  user = this.passport.getUser();


  constructor(private passport: PassportService,
              private modal: NzModalService,
              private router: Router) {
  }

  ngOnInit(): void {

  }

  onLogout() {
    this.modal.confirm({
      nzTitle: '退出提示',
      nzContent: '您确认退出登录吗？',
      nzOnOk: () => true
    }).afterClose.subscribe(data => {
      if (data) {
        this.passport.clear();
        this.router.navigate(['/passport/login']);
      }
    });
  }

}
