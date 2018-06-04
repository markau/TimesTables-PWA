import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AboutpageComponent } from "./aboutpage.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("AboutpageComponent", () => {
  let component: AboutpageComponent;
  let fixture: ComponentFixture<AboutpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutpageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
