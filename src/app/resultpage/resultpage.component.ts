import { Component, OnInit, HostBinding } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data.service";

import { fadeInAnimation } from "../_animations/index";

import { LocalStorage } from "@ngx-pwa/local-storage";
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
  public setsTestedThisTest = [];
  public localStorageKeyName = "testResults-1.3";

  ngOnInit() {
    // If navigating to this page first, redirect back to test setup
    if (!this.dataService.isTestComplete) {
      this.router.navigateByUrl("/setup");
    } else {
      // Save result into session
      this.saveToLocalStorage();
    }
  }

  compareArrays(array1: Array<number>, array2: Array<number>): boolean {
    return array1.length === array2.length && array1.every((element, index) =>
      element === array2[index]
    );
  }

  saveToLocalStorage() {
    this.localStorage.getItem(this.localStorageKeyName).subscribe((data: object[]) => {
      let currentStore = [];
      let resultsOfThisType = [];
      if (data != null) {
        currentStore = data;
      }

      this.accuracyPercentage = this.dataService.accuracyPercentage();
      this.setsTestedThisTest = this.dataService.getSelectedNumberSets();

      const resultObject = {
        date: Date.now(),
        finalMilliSeconds: this.dataService.finalMilliSeconds,
        y: this.setsTestedThisTest,
        accuracyPercentage: this.accuracyPercentage
      };

      // Get previous results if any
      if (currentStore.length > 0) {
        const z = this.setsTestedThisTest;
        resultsOfThisType = currentStore.filter(
          x => this.compareArrays(x.y, this.setsTestedThisTest)
        );
      }

      this.totalResults = currentStore.length + 1;
      this.totalResultsOfThisType = resultsOfThisType.length + 1;
      this.wrongAnswers = this.dataService.incorrectAnswerReport();
      this.isFirstAttempt = resultsOfThisType.length === 0;

      if (!this.isFirstAttempt) {
        this.previousBestTime = Math.min.apply(
          Math,
          resultsOfThisType.map(result =>
            result.finalMilliSeconds
          )
        );
        this.isNewRecordTime =
          !this.isFirstAttempt &&
          resultObject.finalMilliSeconds < this.previousBestTime;
      }

      // Save this result to local storage
      currentStore.push(resultObject);

      this.localStorage.setItem(this.localStorageKeyName, currentStore).subscribe(
        () => {
          // Done
        },
        error => {
          // Error
          console.log("Error saving to Localstorage");
        }
      );
    });
  }
}
