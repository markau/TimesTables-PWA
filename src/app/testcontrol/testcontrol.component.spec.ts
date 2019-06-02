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


//   it("should navigate", () => {
//     return router
//     .navigate(["setup"])
//     .then(() => {
//       expect(router.url).toBe("/setup");
//       expect(component.buttonText).toBe("Start");
//       component.dataService.testState.isTestStarted = true;
//       expect(component.buttonText).toBe("Stop");
//       component.dataService.testState.isTestComplete = true;
//       expect(component.buttonText).toBe("New Test");
//     })
//     .then(x => router.navigate(["test"]))
//     .then(() => {
//       expect(router.url).toBe("/test");
//     })
//     .then(x => router.navigate(["about"]))
//     .then(() => {
//       expect(router.url).toBe("/about");
//       expect(component.buttonText).toBe("Back");
//     })
//     .then(x => router.navigate(["result"]))
//     .then(() => {
//       expect(router.url).toBe("/result");
//     })
//     .then(x => router.navigate(["/"]))
//     .then(() => {
//       expect(router.url).toBe("/");
//     });
// });

it("should", async(() => {
  spyOn(component, "btnClick");

  const button = fixture.debugElement.nativeElement.querySelector("button");
  button.click();

  fixture.whenStable().then(() => {
    expect(component.btnClick).toHaveBeenCalled();
  });
}));

});
