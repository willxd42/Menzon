import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersService } from "src/app/services/users.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"]
})
export class ResetPasswordComponent implements OnInit {
  Form: FormGroup;
  comfirmPassword$: boolean;
  loading: boolean;
  error: boolean;
  check$: boolean;
  notify: string;
  constructor(
    private userService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    localStorage.removeItem("appUserToken");
    localStorage.removeItem("appUser");
    localStorage.removeItem("configs");
    localStorage.removeItem("permissions");

    this.Form = new FormGroup({
      password: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      ),
      confirm_password: new FormControl(
        "",
        Validators.compose([Validators.required])
      )
    });
  }

  get password() {
    return this.Form.get("password");
  }

  get confirm_password() {
    return this.Form.get("confirm_password");
  }

  submit() {
    this.loading = true;
    this.error = false;
    this.userService
      .resetPassword({
        password: this.Form.value.password,
        token: this.route.snapshot.queryParamMap.get("token")
      })
      .subscribe(
        res => {
          window.location.replace("/");
          console.log(res);
        },
        err => {
          console.log(err);

          this.error = true;
          this.loading = false;
        }
      );
  }

  check() {
    this.check$ = true;
    console.log(this.check$);
  }
}
