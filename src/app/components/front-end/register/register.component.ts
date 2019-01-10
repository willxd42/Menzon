import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  comfirmPassword$: boolean;
  errorMessage: string;
  loading: boolean;
  error: boolean;

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl("", Validators.compose([Validators.required])),
      lastName: new FormControl("", Validators.compose([Validators.required])),
      email: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      ),
      mobileNumber: new FormControl(""),
      password: new FormControl("", Validators.compose([Validators.required])),
      password2: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  get firstName() {
    return this.registerForm.get("firstName");
  }

  get lastName() {
    return this.registerForm.get("lastName");
  }

  get email() {
    return this.registerForm.get("email");
  }

  get mobileNumber() {
    return this.registerForm.get("mobileNumber");
  }

  get password() {
    return this.registerForm.get("password");
  }

  get password2() {
    return this.registerForm.get("password2");
  }

  comfirmPassword(): boolean {
    return this.registerForm.value.password2 ===
      this.registerForm.value.password
      ? (this.comfirmPassword$ = true)
      : (this.comfirmPassword$ = false);
  }

  submit() {
    this.loading = true;
    this.error = false;
    this.userService
      .registerUser({
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        phoneNumber: this.registerForm.value.mobileNumber,
        password: this.registerForm.value.password
      })
      .subscribe(
        res => {
          localStorage.setItem("user", JSON.stringify(res));
          console.log(res);
          this.strated(res);
        },
        err => {
          console.log(err);
          this.error = true;
          this.errorMessage = err.error;
          this.loading = false;

          setTimeout(() => (this.error = false), 3000);
        }
      );
  }

  strated(res) {
    localStorage.setItem("appUserToken", res.token);
    localStorage.setItem("appUser", JSON.stringify(res.appUser));
    localStorage.setItem("configs", JSON.stringify(res.configs));
    localStorage.setItem("permissions", JSON.stringify(res.permissions));

    this.router.navigate(["/complete-registration"]);
  }
}
