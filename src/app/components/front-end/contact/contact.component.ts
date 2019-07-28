import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {
  Form: FormGroup;
  loading: boolean;
  error: boolean;
  message: boolean;
  check$: boolean;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.Form = new FormGroup({
      Name: new FormControl("", Validators.compose([Validators.required])),
      Email: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      ),
      Subject: new FormControl("", Validators.compose([Validators.required])),
      Message: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  get Name() {
    return this.Form.get("Name");
  }
  get Email() {
    return this.Form.get("Email");
  }
  get Subject() {
    return this.Form.get("Subject");
  }
  get Message() {
    return this.Form.get("Message");
  }

  check() {
    this.check$ = true;
  }

  submit() {
    console.log("d");

    this.loading = true;
    this.error = false;
    this.message = false;
    this.userService.contactUs(this.Form.value).subscribe(
      res => {
        this.loading = false;
        this.message = true;
        this.Form.reset();

        setTimeout(() => {
          this.message = false;
        }, 3000);
      },
      err => {
        console.log(err);
        this.error = true;
        this.loading = false;
      }
    );
  }
}
