import { Component, OnInit, HostBinding } from "@angular/core";
import { DataService } from "../data.service";

import { fadeInAnimation } from "../_animations/index";

import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-testsetup",
  templateUrl: "./testsetup.component.html",
  styleUrls: ["./testsetup.component.css"],
  animations: [fadeInAnimation]
})
export class TestsetupComponent implements OnInit {
  @HostBinding("@fadeInAnimation") fadeInAnimation = "";

  selectedNumberSet = this.dataService.testState.y;

  onChange = number => {
    this.dataService.testState.y = number;
  }

  constructor(public dataService: DataService, public snackBar: MatSnackBar) {}

  ngOnInit() {

    if (window.matchMedia("(display-mode: browser").matches) {
      // We are in the browser
      window.addEventListener("beforeinstallprompt", event => {
        event.preventDefault();
        const sb = this.snackBar.open(
          "Do you want to install this App?",
          "Install",
          { duration: 5000 }
        );
        sb.onAction().subscribe(() => {
          (event as any).prompt();
          (event as any).userChoice.then(result => {
            if (result.outcome === "dismissed") {
              // TODO: Track no installation
            } else {
              // TODO: It was installed
            }
          });
        });
        return false;
      });
    }
  }
}
