import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { TestsetupComponent } from "./testsetup.component";
import { DataService } from "../data.service";

describe("TestsetupComponent", () => {
  let component: TestsetupComponent;
  let fixture: ComponentFixture<TestsetupComponent>;
  let debugElement: DebugElement;
  let dataService: DataService;
  let radioClickSpy;

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
    debugElement = fixture.debugElement;
    dataService = debugElement.injector.get(DataService);
    radioClickSpy = spyOn(dataService, "changeNumberSet").and.callThrough();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call changeNumberSet on the service", () => {
    debugElement.query(By.css(".radio-3")).triggerEventHandler("click", null);
    expect(radioClickSpy).toHaveBeenCalledWith(3);
  });

});
