import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  comfirmPassword$: boolean;
  loading: boolean;
  error: boolean;
  check$: boolean;
  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  submit() {
    console.log("d");

    this.loading = true;
    this.error = false;
    this.userService
      .loginUser({
        email: this.loginForm.value.email,
        username: this.loginForm.value.email,
        password: this.loginForm.value.password
      })
      .subscribe(
        res => {
          localStorage.setItem("user", JSON.stringify(res));
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
    localStorage.setItem("appUserToken", res.token);
    localStorage.setItem("appUser", JSON.stringify(res.appUser));
    localStorage.setItem("configs", JSON.stringify(res.configs));
    localStorage.setItem("permissions", JSON.stringify(res.permissions));

    const url = localStorage.getItem("returnUrl") || "/profile";

    this.router.navigateByUrl(url);

    localStorage.removeItem("returnUrl");
  }

  check() {
    this.check$ = true;
    console.log(this.check$);
  }
}
