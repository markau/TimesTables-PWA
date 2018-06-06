import { async, ComponentFixture, TestBed } from "@angular/core/testing";
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

  it("Button label via async() and whenStable()", async(() => {
    const el = debugElement
    .query(By.css(".radio-2"));
    el.triggerEventHandler("click", 3);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      // console.log(el.nativeElement);
      // expect(radioClickSpy).toHaveBeenCalledWith(3);
    });
    component.ngOnInit();
  }));
});
