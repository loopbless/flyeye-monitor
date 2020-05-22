import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationApi } from '@/apis/application';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadChangeParam, UploadFile } from 'ng-zorro-antd/upload/interface';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class AppProfileComponent implements OnInit {

  data: any;
  tabIndex = 0;
  @ViewChild('tagElem') tagElem: ElementRef<HTMLInputElement>;
  loading = false;
  private isAppend = false;
  editable = false;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private message: NzMessageService,
              private app: ApplicationApi) {
  }



  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const { appId } = this.route.snapshot.queryParams;
    this.app.find(appId).subscribe((data) => {
      this.data = data;
    });
  }


  onGoTo() {
    this.router.navigate(['/appstore/list']);
  }
}
