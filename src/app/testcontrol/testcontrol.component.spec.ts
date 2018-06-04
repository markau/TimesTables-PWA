import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TestcontrolComponent } from "./testcontrol.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("TestcontrolComponent", () => {
  let component: TestcontrolComponent;
  let fixture: ComponentFixture<TestcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestcontrolComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
