import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ResultpageComponent } from "./resultpage.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MinuteSecondsPipe } from "../minute-seconds.pipe";
import { DataService } from "../data.service";

describe("ResultpageComponent", () => {
  let component: ResultpageComponent;
  let fixture: ComponentFixture<ResultpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserAnimationsModule],
      declarations: [ResultpageComponent, MinuteSecondsPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DataService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
