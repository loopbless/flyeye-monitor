import { SafeDomPipe } from './safe-dom.pipe';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

describe('SafeDomPipe', () => {
  it('create an instance', () => {
    const _sanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SafeDomPipe(_sanitizer);
    expect(pipe).toBeTruthy();
  });
});
