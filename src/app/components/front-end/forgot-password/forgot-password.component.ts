import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  comfirmPassword$: boolean;
  loading: boolean;
  error: boolean;
  check$: boolean;
  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {
    this.error = false;
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      )
    });
  }

  get email() {
    return this.forgotPasswordForm.get("email");
  }

  submit() {
    this.loading = true;
    this.error = false;
    this.userService
      .forgotPassword(this.forgotPasswordForm.value.email)
      .subscribe(
        res => {
          localStorage.setItem("user", JSON.stringify(res));
          console.log(res);
          this.strated(res);
        },
        err => {
          console.log(err);
          // this.error = true
          this.loading = false;
        }
      );
  }

  strated(res) {
    localStorage.setItem("token", res.token);
    localStorage.setItem("appUser", JSON.stringify(res.appUser));
    localStorage.setItem("configs", JSON.stringify(res.configs));
    localStorage.setItem("permissions", JSON.stringify(res.permissions));

    // this.router.navigate(["/complete-registration"]);
  }

  check() {
    this.check$ = true;
    console.log(this.check$);
  }
}
