import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"]
})
export class EditProfileComponent implements OnInit {
  cRForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private calendar: NgbCalendar,
    private router: Router
  ) {}

  ngOnInit() {
    this.cRForm = this.fb.group({
      firstName: "",
      lastName: "",
      middleName: "",
      gender: "",
      dateOfBirth: "",
      email: "",
      phoneNumber: "",
      street_address: "",
      city: "",
      state: "",
      country: "",
      prefaredLocation: "",
      NYSCDdate: "",
      NTSCcompleted: "",
      NTSCcompletedDate: "",
      howDidYouHereAboutUs: ""
    });
  }

  submit() {
    this.router.navigate(["/profile"]);
  }

  editEducation() {
    this.router.navigate(["/edit-education"]);
  }

  editSkill() {
    this.router.navigate(["/edit-skill"]);
  }

  editWorkHistory() {
    this.router.navigate(["/edit-work-history"]);
  }
}
