import { Component, OnInit, HostBinding } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data.service";

import { fadeInAnimation } from "../_animations/index";

import { LocalStorage } from "@ngx-pwa/local-storage";
import { getTypeNameForDebugging } from "@angular/core/src/change_detection/differs/iterable_differs";
import { MinuteSecondsPipe } from "../minute-seconds.pipe";

@Component({
  selector: "app-resultpage",
  templateUrl: "./resultpage.component.html",
  styleUrls: ["./resultpage.component.scss"],
  animations: [fadeInAnimation],
  providers: [MinuteSecondsPipe]
})
export class ResultpageComponent implements OnInit {
  @HostBinding("@fadeInAnimation") fadeInAnimation = "";
  constructor(
    private router: Router,
    public dataService: DataService,
    protected localStorage: LocalStorage,
    private minuteSecondsPipe: MinuteSecondsPipe
  ) {}

  public isFirstAttempt = false;
  public isNewRecordTime = false;
  public previousBestTime = 0;
  public totalResults = 0;
  public totalResultsOfThisType = 0;
  public accuracyPercentage = 0;
  public wrongAnswers = "";

  ngOnInit() {
    // If navigating to this page first, redirect back to test setup
    if (!this.dataService.testState.isTestComplete) {
      this.router.navigateByUrl("/setup");
    } else {
      // Save result into session
      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage = function() {
    this.localStorage.getItem("testResults").subscribe(data => {
      let currentStore = [];
      let resultsOfThisType = [];
      if (data != null) {
        currentStore = data;
      }

      const resultObject = {
        date: Date.now(),
        finalMilliSeconds: this.dataService.testState.finalMilliSeconds,
        incorrectX: this.dataService.testState.incorrectX,
        y: this.dataService.testState.y,
        accuracyPercentage:
          (12 - this.dataService.testState.incorrectX.length) / 12 * 100
      };

      // Get previous results if any
      if (currentStore.length > 0) {
        resultsOfThisType = currentStore.filter(
          x => x.y === this.dataService.testState.y
        );
      }

      this.totalResults = currentStore.length + 1;
      this.totalResultsOfThisType = resultsOfThisType.length + 1;
      this.accuracyPercentage = resultObject.accuracyPercentage;

      // wrong answers
      const uniqueWrongAnswerArray = Array.from(
        new Set(this.dataService.testState.incorrectX.map(item => item))
      ).sort();
      this.wrongAnswers = uniqueWrongAnswerArray.join(
        `x${this.dataService.testState.y} `
      );
      this.wrongAnswers += `x${this.dataService.testState.y}`;

      this.isFirstAttempt = resultsOfThisType.length === 0;

      if (!this.isFirstAttempt) {
        this.previousBestTime = Math.min.apply(
          Math,
          resultsOfThisType.map(function(o) {
            return o.finalMilliSeconds;
          })
        );
        this.isNewRecordTime =
          !this.isFirstAttempt &&
          resultObject.finalMilliSeconds < this.previousBestTime;
      }

      // Save this result to local storage
      currentStore.push(resultObject);

      this.localStorage.setItem("testResults", currentStore).subscribe(
        () => {
          // Done
        },
        error => {
          // Error
          console.log("Error saving to Localstorage");
        }
      );
    });
  };
}
