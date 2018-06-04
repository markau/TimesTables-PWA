import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ResultpageComponent } from "./resultpage.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("ResultpageComponent", () => {
  let component: ResultpageComponent;
  let fixture: ComponentFixture<ResultpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultpageComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
