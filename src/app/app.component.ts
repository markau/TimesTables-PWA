import { Component } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "backspace",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/backspace.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "checkmark-outline",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/checkmark-outline.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "hot",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/hot.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "timer",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/timer.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "github",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/github.svg")
    );
  }
  title = "app";
}
