import { NavigationEnd, Router } from "@angular/router";
import { Component, Input, OnInit, Output } from "@angular/core";
import { Location } from "@angular/common";
import { filter } from "rxjs";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"],
})
export class ToolbarComponent implements OnInit {
  @Input() data: String;
  previousUrl: string;

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {}

  goBackFunction() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = event.url;
      });

    this.location.back();
  }
}
