import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Location } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { TestcontrolComponent } from "./testcontrol.component";
import { DataService } from "../data.service";

describe("TestcontrolComponent", () => {
  let component: TestcontrolComponent;
  let fixture: ComponentFixture<TestcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TestcontrolComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
