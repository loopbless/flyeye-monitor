import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UploadChangeParam, UploadFile } from 'ng-zorro-antd/upload/interface';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-version-form',
  templateUrl: './version-form.component.html',
  styleUrls: ['./version-form.component.less']
})
export class VersionFormComponent {

  tagVisible = false;
  @ViewChild('tagElem') tagElem: ElementRef<HTMLInputElement>;

  @Input()
  set sourceMap(data: AbstractControl) {
    this.formGroup.addControl('sourceMap', data);
  }

  @Input()
  set tags(data: AbstractControl) {
    this.formGroup.addControl('tags', data);
  }

  fileList: UploadFile[] = [];
  formGroup = this.fb.group({ newTag: null });

  constructor(private fb: FormBuilder) {
  }

  get tagValue() {
    return this.formGroup.get('newTag').value;
  }

  set tagValue(value) {
    this.formGroup.get('newTag').setValue(value);
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

  beforeUpload() {
    return (file: UploadFile, fileList: UploadFile[]) => {
      this.formGroup.get('sourceMap').setValue(file);
      this.fileList = [file];
      return false;
    };
  }

  onChangeFile(event: UploadChangeParam) {
    if (event.type === 'removed') {
      this.formGroup.get('sourceMap').setValue(null);
      this.fileList = [];
    }
  }
}
