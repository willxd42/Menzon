import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.css"]
})
export class VerifyEmailComponent implements OnInit {
  loading: boolean;
  error: boolean;
  message: string;
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.error = false;
    this.userService
      .verifyEmail(this.route.snapshot.queryParamMap.get("token"))
      .subscribe(
        res => {
          // this.message = res["error"].userMessage
          this.loading = false;
        },
        err => {
          const message = err["error"].userMessage;

          if (message === "token is invalid or has expired") {
            this.message = "Verification Link has expired!";
            this.error = true;
            this.loading = false;
          } else {
            this.message = message;
            this.error = true;
            this.loading = false;
          }
        }
      );
  }
}
