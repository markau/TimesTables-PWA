import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { Router, Routes } from "@angular/router";

import { MinuteSecondsPipe } from "../minute-seconds.pipe";
import { DataService } from "../data.service";

import { TestcontrolComponent } from "../testcontrol/testcontrol.component";
import { TestsetupComponent } from "../testsetup/testsetup.component";
import { TestpageComponent } from "./testpage.component";
import { ResultpageComponent } from "../resultpage/resultpage.component";
import { AboutpageComponent } from "../aboutpage/aboutpage.component";

const appRoutes: Array<Object> = [
  { path: "setup", component: TestsetupComponent },
  { path: "test", component: TestpageComponent },
  { path: "result", component: ResultpageComponent },
  { path: "about", component: AboutpageComponent },
  { path: "**", component: TestsetupComponent }
];
describe("TestpageComponent", () => {
  let component: TestpageComponent;
  let fixture: ComponentFixture<TestpageComponent>;
  let debugElement: DebugElement;
  let dataService: DataService;
  let backSpaceSpy;
  let enterNumberSpy;
  let verifyAnswerSpy;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(appRoutes),
        BrowserAnimationsModule
      ],
      declarations: [
        ResultpageComponent,
        MinuteSecondsPipe,
        TestsetupComponent,
        TestpageComponent,
        AboutpageComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    debugElement = fixture.debugElement;
    dataService = debugElement.injector.get(DataService);
    backSpaceSpy = spyOn(dataService, "doBackspace").and.callThrough();
    enterNumberSpy = spyOn(
      dataService,
      "enterAnswer"
    ).and.callThrough();
    verifyAnswerSpy = spyOn(dataService, "verifyAnswer").and.callThrough();
    // verifyAnswerSpy = spyOn(dataService, "verifyAnswer").and.returnValue(true);
  });

  // https://alligator.io/angular/testing-with-spies/

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load test data", () => {
    expect(component.dataService.getSelectedNumberSets()).toEqual([2]);
  });

  it("should render a 6 button", () => {
    const buttonDe = fixture.debugElement.query(By.css(".key-6"));
    const buttonEl = buttonDe.nativeElement;
    expect(buttonEl.innerHTML).toContain(6);
  });

  it("should show answer in template", () => {
    debugElement
      .query(By.css("button.key-6"))
      .triggerEventHandler("click", null);

    fixture.detectChanges();
    const value = debugElement.query(By.css(".answer")).nativeElement.innerText;
    expect(value).toEqual("6");
  });

  it("should call enterNumberIntoAnswerBuffer on the service", () => {
    debugElement
      .query(By.css("button.key-6"))
      .triggerEventHandler("click", null);

    expect(component.dataService.answerBuffer).toBe("6");
    expect(enterNumberSpy).toHaveBeenCalledWith(6);
  });

  it("should call doBackspace on the service", () => {
    debugElement
      .query(By.css("button.key-6"))
      .triggerEventHandler("click", null);
      debugElement
      .query(By.css("button.key-backspace"))
      .triggerEventHandler("click", null);

    expect(component.dataService.answerBuffer).toBe("");
    expect(backSpaceSpy).toHaveBeenCalled();
  });

  it("should call verifyAnswer on the service", () => {
    debugElement
      .query(By.css("button.key-6"))
      .triggerEventHandler("click", null);
      debugElement
      .query(By.css("button.key-enter"))
      .triggerEventHandler("click", null);

      expect(verifyAnswerSpy).toHaveBeenCalled();
  });

  it("should call not process empty answer buffer", () => {
    // jasmine.clock().install();
      debugElement
        .query(By.css("button.key-enter"))
        .triggerEventHandler("click", null);
      expect(verifyAnswerSpy).not.toHaveBeenCalled();
    // jasmine.clock().tick(550);
  });

  it("should redirect on test complete", () => {
      component.dataService.isTestComplete = true;
      debugElement
        .query(By.css("button.key-6"))
        .triggerEventHandler("click", null);
      debugElement
        .query(By.css("button.key-enter"))
        .triggerEventHandler("click", null);
      expect(verifyAnswerSpy).toHaveBeenCalled();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(router.url).toBe("/result");
      });
  });

  it("should navigate to Setup onInit if test is not complete", () => {
    component.dataService.isTestStarted = true;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(router.url).toBe("/setup");
    });
    component.ngOnInit();
  });


});
