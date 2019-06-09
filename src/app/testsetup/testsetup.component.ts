import { Component, OnInit, HostBinding } from "@angular/core";
import { DataService } from "../data.service";

import { fadeInAnimation } from "../_animations/index";

@Component({
  selector: "app-testsetup",
  templateUrl: "./testsetup.component.html",
  styleUrls: ["./testsetup.component.css"],
  animations: [fadeInAnimation]
})
export class TestsetupComponent implements OnInit {
  @HostBinding("@fadeInAnimation") fadeInAnimation = "";

  public selectedNumberSets = this.dataService.getSelectedNumberSets();
  public showAddToHomeScreen = false;
  private deferredPrompt: any;

  addToHomeScreen = () => {
    this.showAddToHomeScreen = false;
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      this.deferredPrompt = null;
    });
  }

  onChange = (event, number) => {
    console.log(event.option.value);
    this.dataService.updateNumberSet(event.option.value);
  }

  constructor(public dataService: DataService) {}

  ngOnInit() {

    console.log(this.selectedNumberSets);

    if (window.matchMedia("(display-mode: browser").matches) {
      // We are in the browser
      window.addEventListener("beforeinstallprompt", e => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        this.deferredPrompt = e;
        // Show the button to the user
        this.showAddToHomeScreen = true;
      });
    }
  }
}
