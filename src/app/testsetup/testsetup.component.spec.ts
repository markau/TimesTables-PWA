import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TestsetupComponent } from "./testsetup.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("TestsetupComponent", () => {
  let component: TestsetupComponent;
  let fixture: ComponentFixture<TestsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestsetupComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
