import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";

@Component({
  selector: "app-complete-registration",
  templateUrl: "./complete-registration.component.html",
  styleUrls: ["./complete-registration.component.css"]
})
export class CompleteRegistrationComponent implements OnInit {
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
      howDidYouHereAboutUs: "",
      education: this.fb.array([]),
      workHistory: this.fb.array([]),
      skills: this.fb.array([])
    });

    this.addEducation();
    this.addWorkHistory();
    this.addSkill();
  }

  get educationForms() {
    return this.cRForm.get("education") as FormArray;
  }

  addEducation() {
    const education = this.fb.group({
      institution: [],
      degree: [],
      country: [],
      fromYear: [],
      fromMonth: [],
      toYear: [],
      toMonth: [],
      course: []
    });

    this.educationForms.push(education);
  }

  deleteEducation(i) {
    this.educationForms.removeAt(i);
  }

  get workHistoryForms() {
    return this.cRForm.get("workHistory") as FormArray;
  }

  addWorkHistory() {
    const workHistory = this.fb.group({
      company: [],
      jobTitle: [],
      country: [],
      fromYear: [],
      fromMonth: [],
      toYear: [],
      toMonth: []
    });

    this.workHistoryForms.push(workHistory);
  }

  deleteWorkHistory(i) {
    this.workHistoryForms.removeAt(i);
  }

  get skillsForms() {
    return this.cRForm.get("skills") as FormArray;
  }

  addSkill() {
    const skill = this.fb.group({
      skill: [],
      skillLevel: [],
      lastYearUsed: [],
      lastMonthUsed: [],
      yearsOfExperience: []
    });

    this.skillsForms.push(skill);
  }

  deleteSkill(i) {
    this.skillsForms.removeAt(i);
  }

  submit() {
    this.router.navigate(["/profile"]);
  }
}
