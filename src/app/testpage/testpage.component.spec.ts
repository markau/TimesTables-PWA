import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

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
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
