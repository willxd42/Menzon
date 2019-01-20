import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersService } from "src/app/services/users.service";
import { Router, ActivatedRoute } from "@angular/router";
import { GloberService } from "src/app/services/glober.service";

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
  notify: string;
  message: string;

  constructor(
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    public globalService: GloberService
  ) {
    this.globalService.change$.subscribe(res => this.ngOnInit());
  }

  ngOnInit() {
    if (localStorage.getItem("notify")) {
      this.notify = localStorage.getItem("notify");

      setTimeout(() => {
        localStorage.removeItem("notify");
      }, 2000);
    }
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
    this.loading = true;
    this.error = false;
    this.message = null;
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
          if (
            err.error.developerMessage ===
            { password: ["size must be between 5 and 2147483647"] }
          ) {
            this.message = "Password Too short must be at least 5 charaters ";
          } else if (err.error.developerMessage === "Login Failed") {
            this.message = "Please Check Your Email long";
          }
          this.error = true;
          this.loading = false;
        }
      );
  }

  strated(res) {
    localStorage.setItem("appUserToken", res.token);
    localStorage.setItem("appUser", JSON.stringify(res.appUser));
    localStorage.setItem("configs", JSON.stringify(res.configs));
    localStorage.setItem("permissions", JSON.stringify(res.permissions));

    this.globalService.change();
    const url =
      this.route.snapshot.queryParamMap.get("returnUrl") ||
      localStorage.getItem("returnUrl") ||
      "/profile";

    this.router.navigateByUrl(url);

    localStorage.removeItem("returnUrl");
  }

  check() {
    this.check$ = true;
    console.log(this.check$);
  }
}
