import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { Router, Routes } from "@angular/router";

import { MinuteSecondsPipe } from "../minute-seconds.pipe";
import { DataService } from "../data.service";

import { TestsetupComponent } from "../testsetup/testsetup.component";
import { TestpageComponent } from "../testpage/testpage.component";
import { ResultpageComponent } from "./resultpage.component";
import { AboutpageComponent } from "../aboutpage/aboutpage.component";

const appRoutes: Array<Object> = [
  { path: "setup", component: TestsetupComponent },
  { path: "test", component: TestpageComponent },
  { path: "result", component: ResultpageComponent },
  { path: "about", component: AboutpageComponent },
  { path: "**", component: TestsetupComponent }
];

describe("ResultpageComponent", () => {
  let component: ResultpageComponent;
  let fixture: ComponentFixture<ResultpageComponent>;
  let debugElement: DebugElement;
  let dataService: DataService;
  let saveToLocalStorageSpy;
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
    fixture = TestBed.createComponent(ResultpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    debugElement = fixture.debugElement;
    dataService = debugElement.injector.get(DataService);
    saveToLocalStorageSpy = spyOn(component, "saveToLocalStorage").and.callThrough();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("saveToLocalStorage() is called on the component", async(() => {
    component.dataService.testState.isTestComplete = true;

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(saveToLocalStorageSpy).toHaveBeenCalled();
    });
    component.ngOnInit();
  }));

  it("should navigate to Setup onInit if test is not complete", async(() => {
    component.dataService.testState.isTestComplete = false;

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(router.url).toBe("/setup");
    });
    component.ngOnInit();
  }));

});
