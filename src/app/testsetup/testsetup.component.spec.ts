import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsetupComponent } from './testsetup.component';

describe('TestsetupComponent', () => {
  let component: TestsetupComponent;
  let fixture: ComponentFixture<TestsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
