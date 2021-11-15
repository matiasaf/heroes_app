import { Component, OnInit } from "@angular/core";
import { LoadingService } from "./shared/services/loading.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Heroes Application";
  links = [{ path: "/home", icon: "home", title: "Home" }];

  constructor(public loadingService: LoadingService) {}
}
