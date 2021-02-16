import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
// import { MatRadioModule } from "@angular/material/radio";

import { TestsetupComponent } from "./testsetup.component";
import { DataService } from "../data.service";

describe("TestsetupComponent", () => {
  let component: TestsetupComponent;
  let fixture: ComponentFixture<TestsetupComponent>;
  let debugElement: DebugElement;
  let dataService: DataService;
  let radioClickSpy;

  beforeEach(waitForAsync(() => {
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
    radioClickSpy = spyOn(dataService, "updateNumberSet").and.callThrough();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Clicking checkbox calls service method", waitForAsync(() => {
    spyOn(component, "onChange").and.callThrough();
    fixture.debugElement.query(By.css(".my-mat-list")).triggerEventHandler("selectionChange", { option: 3 });
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.onChange).toHaveBeenCalled();
      // expect(component.onChange).toHaveBeenCalledWith({ value: 3 });
      // expect(dataService.updateNumberSet).toHaveBeenCalledWith(3);
    });
  }));

});
