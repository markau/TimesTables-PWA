import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Location } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, ComponentRef } from "@angular/core";
import { TestcontrolComponent } from "./testcontrol.component";
import { Router, Routes } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { DebugElement } from "@angular/core";

import { MinuteSecondsPipe } from "../minute-seconds.pipe";
import { DataService } from "../data.service";

import { TestsetupComponent } from "../testsetup/testsetup.component";
import { TestpageComponent } from "../testpage/testpage.component";
import { ResultpageComponent } from "../resultpage/resultpage.component";
import { AboutpageComponent } from "../aboutpage/aboutpage.component";

const appRoutes: Array<Object> = [
  { path: "setup", component: TestsetupComponent },
  { path: "test", component: TestpageComponent },
  { path: "result", component: ResultpageComponent },
  { path: "about", component: AboutpageComponent },
  { path: "**", component: TestsetupComponent }
];


describe("TestcontrolComponent", () => {
  let component: TestcontrolComponent;
  let fixture: ComponentFixture<TestcontrolComponent>;
  let router: Router;
  let debugElement: DebugElement;
  let dataService: DataService;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(appRoutes)
      ],
      declarations: [
        ResultpageComponent,
        MinuteSecondsPipe,
        TestsetupComponent,
        TestpageComponent,
        TestcontrolComponent,
        AboutpageComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DataService]
    }).compileComponents();

    fixture = TestBed.createComponent(TestcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    debugElement = fixture.debugElement;
    dataService = debugElement.injector.get(DataService);
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should navigate to About page and the button should show Back", async () => {
    await router
      .navigate(["about"]);
    expect(router.url).toBe("/about");
    expect(component.buttonText).toBe("Back");
});

it("should naviate to the Setup page and the button should show Start when test not started", async () => {
  await router
    .navigate(["setup"]);
    expect(router.url).toBe("/setup");
    expect(component.buttonText).toBe("Start");
});

it("should naviate to the Setup page and the button should show Stop when test is started", async () => {
  component.dataService.testState.isTestStarted = true;
  await router
    .navigate(["setup"]);
    expect(router.url).toBe("/setup");
    expect(component.buttonText).toBe("Stop");
});

it("should naviate to the Setup page and the button should show New Test when test is completed", async () => {
  component.dataService.testState.isTestComplete = true;
  await router
    .navigate(["setup"]);
    expect(router.url).toBe("/setup");
    expect(component.buttonText).toBe("New Test");
});


  it("should navigate from about to setup", async () => {
    await router
      .navigate(["about"]);
    expect(router.url).toBe("/about");

    spyOn(component, "btnClick").and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();

    fixture.whenStable().then(() => {
      expect(component.btnClick).toHaveBeenCalled();
      expect(location.path()).toBe("/setup");
    });
  });

  it("should navigate to setup when test started", async () => {
    component.dataService.testState.isTestStarted = true;

    spyOn(component, "btnClick").and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();

    fixture.whenStable().then(() => {
      expect(component.btnClick).toHaveBeenCalled();
      expect(location.path()).toBe("/setup");
    });
  });

  it("should navigate to setup when test started", async () => {
    component.dataService.testState.isTestComplete = true;

    spyOn(component, "btnClick").and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();

    fixture.whenStable().then(() => {
      expect(component.btnClick).toHaveBeenCalled();
      expect(location.path()).toBe("/setup");
    });
  });

  it("should navigate to test", async () => {
    component.dataService.testState.isTestStarted = false;
    component.dataService.testState.isTestComplete = false;
    await router
      .navigate(["setup"]);
    expect(router.url).toBe("/setup");

    spyOn(component, "btnClick").and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector("button");
    button.click();

    fixture.whenStable().then(() => {
      expect(component.btnClick).toHaveBeenCalled();
      expect(location.path()).toBe("/test");
    });
  })

});

