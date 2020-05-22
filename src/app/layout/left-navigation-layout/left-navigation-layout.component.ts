import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/services/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-left-navigation-layout',
  templateUrl: './left-navigation-layout.component.html',
  styleUrls: ['./left-navigation-layout.component.less']
})
export class LeftNavigationLayoutComponent implements OnInit {
  applications: any[] = [];
  currentApp: number = parseInt(this.route.snapshot.queryParams.appId);
  hiddenAppSelect = this.router.isActive('/appstore/new', false);

  constructor(private app: AppService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.app.loadData().subscribe(({ data }) => {
      this.applications = data;
    });
  }

  onChangeApp(event: any) {
    this.currentApp = event;
    this.router.navigate([this.router.url], { queryParams: { appId: event } });
  }

  onBack() {
    this.router.navigate(['/appstore/list']);
  }

  onGoTo() {
    this.router.navigate(['/appstore/profile'], { queryParams: { appId: this.currentApp } });
  }
}
