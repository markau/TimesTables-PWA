import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { TestsetupComponent } from "./testsetup.component";
import { DataService } from "../data.service";

describe("TestsetupComponent", () => {
  let component: TestsetupComponent;
  let fixture: ComponentFixture<TestsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [TestsetupComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DataService]
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
