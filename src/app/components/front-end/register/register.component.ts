import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  comfirmPassword$: boolean;

  constructor(private userService: UsersService) {
    this.registerForm = new FormGroup({
      firstName: new FormControl("", Validators.compose([Validators.required])),
      lastName: new FormControl("", Validators.compose([Validators.required])),
      email: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      ),
      phoneNumber: new FormControl(""),
      password: new FormControl("", Validators.compose([Validators.required])),
      password2: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  ngOnInit() {}

  get firstName() {
    return this.registerForm.get("firstName");
  }

  get lastName() {
    return this.registerForm.get("lastName");
  }

  get email() {
    return this.registerForm.get("email");
  }

  get phoneNumber() {
    return this.registerForm.get("phoneNumber");
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
    this.userService
      .registerUser({
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        phoneNumber: this.registerForm.value.phoneNumber,
        password: this.registerForm.value.password
      })
      .subscribe(
        res => {
          localStorage.setItem("user", JSON.stringify(res));
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }
}
