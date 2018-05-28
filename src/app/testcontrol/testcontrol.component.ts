import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data.service";

@Component({
  selector: "app-testcontrol",
  templateUrl: "./testcontrol.component.html",
  styleUrls: ["./testcontrol.component.css"]
})
export class TestcontrolComponent implements OnInit {
  constructor(private router: Router, public dataService: DataService) {}

  ngOnInit() {}

  btnClick = function() {
    if (this.dataService.testState.isTestStarted) {
      this.router.navigateByUrl("/setup");
      this.dataService.resetTest();
    } else if (this.dataService.testState.isTestComplete) {
      this.router.navigateByUrl("/setup");
      this.dataService.resetTest();
    } else {
      this.router.navigateByUrl("/test");
      this.dataService.startTest();
    }
  };
}
