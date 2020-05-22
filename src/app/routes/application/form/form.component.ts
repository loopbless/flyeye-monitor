import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationApi } from '@/apis/application';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadChangeParam, UploadFile } from 'ng-zorro-antd/upload/interface';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class AppFormComponent implements OnInit {

  data: any;
  formGroup: FormGroup;
  tabIndex = 0;
  @ViewChild('tagElem') tagElem: ElementRef<HTMLInputElement>;
  loading = false;
  queryId: number;
  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private message: NzMessageService,
              private app: ApplicationApi) {
  }

  ngOnInit(): void {
    this.loadData();
    this.formGroup = this.fb.group({
      name: [null, Validators.required],
      sourceMap: [null, [Validators.required, (control: FormControl) => {
        const value = control.value;
        return value && value.type && value.type !== 'application/zip' ? { type: true } : null;
      }]],
      tags: [[]],
      newTag: [null],
    });
  }

  loadData() {
    this.queryId = this.route.snapshot.queryParams.id;
    if (this.queryId) {
      this.app.find(this.queryId).subscribe(data => {
        this.data = data;
      });
    }
  }

  onSubmit() {
    this.loading = true;
    if (this.formGroup.valid) {
      this.app.insert(this.formGroup.value).subscribe(data => {
        this.router.navigate(['/apps/news'], { queryParams: { id: data.id } });
        this.queryId = data.id;
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    } else {
      this.formGroup.get('name').markAsDirty();
      this.formGroup.get('sourceMap').markAsDirty();
      this.formGroup.get('name').updateValueAndValidity();
      this.formGroup.get('sourceMap').updateValueAndValidity();
    }
  }

  onGoTo() {
    this.router.navigate(['/appstore/list']);
  }
}
