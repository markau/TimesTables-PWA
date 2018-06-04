import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TestpageComponent } from "./testpage.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("TestpageComponent", () => {
  let component: TestpageComponent;
  let fixture: ComponentFixture<TestpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestpageComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
