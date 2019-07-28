import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GloberService } from "src/app/services/glober.service";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  user: any;
  constructor(private router: Router, public globerService: GloberService) {
    this.globerService.change$.subscribe(c => this.ngOnInit());
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    if (localStorage.getItem("appUser")) {
      this.user = JSON.parse(localStorage.getItem("appUser"));
    }
  }

  logOut() {
    localStorage.removeItem("appUserToken");
    localStorage.removeItem("appUser");
    localStorage.removeItem("configs");
    localStorage.removeItem("permissions");

    window.location.replace("/");
  }
}
