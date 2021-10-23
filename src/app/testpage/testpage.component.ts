import { Component, OnInit, OnDestroy, HostBinding, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data.service";

import { fadeInAnimation } from "../_animations/index";

import { Subscription, timer } from "rxjs";

@Component({
  selector: "app-testpage",
  templateUrl: "./testpage.component.html",
  styleUrls: ["./testpage.component.css"],
  animations: [fadeInAnimation]
})
export class TestpageComponent implements OnInit, OnDestroy {
  @HostBinding("@fadeInAnimation") fadeInAnimation = "";

  private subscription: Subscription;

  constructor(private router: Router, public dataService: DataService, private zone: NgZone) { }

  public showCorrectAnimation = false;
  public showIncorrectAnimation = false;

  ngOnInit() {
    // If the user has inadvertently found their way here, redirect back to test setup
    if (!this.dataService.isTestStarted) {
      this.zone.run(() => {
        this.router.navigateByUrl("/setup");
      });
    }

    // Calculate elapsed milliseconds of test.
    const startDate = new Date();
    const testTimer = timer(0, 1000);
    this.subscription = testTimer.subscribe(timerEvent => {
      let ms = Math.abs(new Date().getTime() - new Date(startDate).getTime());
      this.dataService.elapsedMilliSeconds = ms;
      // console.log(ms, timerEvent);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  btnClick = function (entry) {
    if (entry === "del") {
      this.dataService.doBackspace();
    } else if (entry === "enter") {
      // Ignore null entry
      if (this.dataService.answerBuffer.length > 0) {
        // Process answer
        const answerIsCorrect = this.dataService.verifyAnswer();

        // Show respective animation
        this.showCorrectAnimation = answerIsCorrect;
        this.showIncorrectAnimation = !answerIsCorrect;

        setTimeout(() => {
          this.showCorrectAnimation = false;
          this.showIncorrectAnimation = false;
        }, 500);

        // Change navigation if test complete
        if (this.dataService.isTestComplete) {
          this.zone.run(() => {
            this.router.navigateByUrl("/result");
          });
        }
      }
    } else {
      this.dataService.enterAnswer(entry);
    }
  };
}
