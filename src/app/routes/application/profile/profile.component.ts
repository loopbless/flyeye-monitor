import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationApi } from '@apis/application';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class AppProfileComponent implements OnInit {

  data: any;
  fileList = [];
  formGroup: FormGroup;
  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private app: ApplicationApi) { }

  ngOnInit(): void {
    this.loadData();
    this.formGroup = this.fb.group({
      name: [null, Validators.required],
      webHook: [null],
      sourceMap: [null, Validators.required],
    })
  }

  loadData() {
    const id = this.route.snapshot.params.id;
    if(id !== 'new') {
      this.app.find(id).subscribe(data => {
        this.data = data;
      });
    }
  }

  onSubmit() {

  }
}
