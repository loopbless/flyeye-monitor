import { Component, Input, OnInit } from '@angular/core';
import { AlarmApi } from '@/apis/alarm';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationApi } from '@/apis/application';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-alarm-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class AlarmFormComponent implements OnInit {
  formGroup: FormGroup;
  modes = [];
  dataTypes = [];
  loading = false;

  private _formData: any;

  @Input()
  set formData(data: any) {
    if (this.formGroup && data) {
      this.formGroup.setValue({
        dataType: data.dataType,
        dataTags: data.dataTags,
        mode: data.mode,
        target: data.target,
        template: data.template,
      });
    }
    this._formData = data;
  }

  constructor(private alarm: AlarmApi,
              private app: ApplicationApi,
              private route: ActivatedRoute,
              private drawerRef: NzDrawerRef,
              private message: NzMessageService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      dataType: [this._formData.dataType, [Validators.required]],
      dataTags: [this._formData.dataTags, [Validators.required]],
      mode: [this._formData.mode, [Validators.required]],
      target: [this._formData.target, [Validators.required]],
      template: [this._formData.template, [Validators.required]],
    });
    this.loadData();
  }

  loadData() {
    this.alarm.getModeList().subscribe(data => {
      this.modes = data;
    });
    this.app.getDataTypes().subscribe(data => {
      this.dataTypes = data;
    });
  }

  onSubmit() {
    this.loading = true;
    const { appId } = this.route.snapshot.queryParams;
    this.alarm.save({
      ...this.formGroup.value,
      appId, ...this._formData ? { id: this._formData.id } : {}
    }).subscribe(data => {
      this.message.success(`${this._formData ? '修改' : '添加'}成功！`);
      this.loading = false;
      this.drawerRef.close();
    }, () => {
      this.loading = false;
    });
  }
}
