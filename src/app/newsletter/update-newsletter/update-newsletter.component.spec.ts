import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNewsletterComponent } from './update-newsletter.component';

describe('UpdateNewsletterComponent', () => {
  let component: UpdateNewsletterComponent;
  let fixture: ComponentFixture<UpdateNewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateNewsletterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
