import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-testcontrol",
  templateUrl: "./testcontrol.component.html",
  styleUrls: ["./testcontrol.component.css"]
})
export class TestcontrolComponent implements OnInit {
  constructor(
    private location: Location,
    private router: Router,
    public dataService: DataService,
    private zone: NgZone
  ) {
    router.events.subscribe(val => {
      if (location.path() === "/about") {
        this.buttonText = "Back";
      } else if (this.dataService.isTestStarted) {
        this.buttonText = "Stop";
      } else if (this.dataService.isTestComplete) {
        this.buttonText = "New Test";
      } else {
        this.buttonText = "Start";
      }
    });
  }

  public buttonText = "";

  ngOnInit() {}

  btnClick = function() {
    if (this.location.path() === "/about") {
      this.zone.run(() => {
        this.router.navigateByUrl("/setup");
      });
      this.dataService.resetTest();
    } else if (this.dataService.isTestStarted) {
      this.zone.run(() => {
        this.router.navigateByUrl("/setup");
      });
      this.dataService.resetTest();
    } else if (this.dataService.isTestComplete) {
      this.zone.run(() => {
        this.router.navigateByUrl("/setup");
      });
      this.dataService.resetTest();
    } else {
      if (this.dataService.getSelectedNumberSets().length > 0) {
        this.zone.run(() => {
          this.router.navigateByUrl("/test");
        });
          this.dataService.startTest();
      }
    }
  };
}
