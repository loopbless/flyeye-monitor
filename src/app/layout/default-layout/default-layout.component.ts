import { Component, OnInit } from '@angular/core';
import { PassportService } from '../../core/services/passport.service';
import { Router } from '@angular/router';
import { AppService } from '../../core/services/app.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.less']
})
export class DefaultLayoutComponent implements OnInit {

  user = this.passport.getUser();

  currentApp: number;

  applications: any[] = [];

  constructor(private passport: PassportService,
              private app: AppService,
              private router: Router) { }

  ngOnInit(): void {
    this.app.loadData().subscribe(({data}) => {
      this.applications = data;
    });
  }

  onLogout() {
    this.passport.clear();
    this.router.navigate(['/passport/login']);
  }

  onChangeApp(event: any) {

  }
}
