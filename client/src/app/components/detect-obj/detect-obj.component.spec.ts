import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectObjComponent } from './detect-obj.component';

describe('DetectObjComponent', () => {
  let component: DetectObjComponent;
  let fixture: ComponentFixture<DetectObjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetectObjComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectObjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
