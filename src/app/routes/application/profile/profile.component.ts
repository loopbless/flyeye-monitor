import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  tagVisible = false;
  @ViewChild('tagElem') tagElem: ElementRef<HTMLInputElement>;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private app: ApplicationApi) {
  }

  get tagValue() {
    return this.formGroup.get('newTag').value;
  }

  set tagValue(value) {
    this.formGroup.get('newTag').setValue(value);
  }

  ngOnInit(): void {
    this.loadData();
    this.formGroup = this.fb.group({
      name: [null, Validators.required],
      sourceMap: [null, Validators.required],
      tags: [[]],
      newTag: [null],
    });
  }

  loadData() {
    const id = this.route.snapshot.params.id;
    if (id !== 'new') {
      this.app.find(id).subscribe(data => {
        this.data = data;
      });
    }
  }

  onSubmit() {

  }

  onAddTag() {
    const tags = this.formGroup.get('tags');
    if (this.tagValue && tags.value.indexOf(this.tagValue) === -1) {
      tags.setValue([...tags.value, this.tagValue]);
    }
    this.tagValue = '';
    this.tagVisible = false;
  }

  onTagClose(removedTag: {}): void {
    const tags = this.formGroup.get('tags');
    tags.setValue(tags.value.filter(tag => tag !== removedTag));
  }

  showInput(): void {
    this.tagVisible = true;
    const timer = setTimeout(() => {
      this.tagElem?.nativeElement.focus();
      clearTimeout(timer);
    }, 10);
  }
}
