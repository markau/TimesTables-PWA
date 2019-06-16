import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { ServiceWorkerModule } from "@angular/service-worker";
import { AppComponent } from "./app.component";
import { TestcontrolComponent } from "./testcontrol/testcontrol.component";
import { TestsetupComponent } from "./testsetup/testsetup.component";
import { TestpageComponent } from "./testpage/testpage.component";
import { ResultpageComponent } from "./resultpage/resultpage.component";
import { AboutpageComponent } from "./aboutpage/aboutpage.component";

import { environment } from "../environments/environment";

import { MatTable } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";

import { RouterModule, Routes } from "@angular/router";

import { DataService } from "./data.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MinuteSecondsPipe } from "./minute-seconds.pipe";

// import { NgxLineChartModule } from "../../ngx-line-chart";

const appRoutes: Routes = [
  { path: "setup", component: TestsetupComponent },
  { path: "test", component: TestpageComponent },
  { path: "result", component: ResultpageComponent },
  { path: "about", component: AboutpageComponent },
  { path: "**", component: TestsetupComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TestcontrolComponent,
    TestsetupComponent,
    TestpageComponent,
    MinuteSecondsPipe,
    ResultpageComponent,
    AboutpageComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  exports: [MinuteSecondsPipe],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
