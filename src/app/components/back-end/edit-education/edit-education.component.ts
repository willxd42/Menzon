import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit {

  cRForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.cRForm = this.fb.group({
      education: this.fb.array([]),
    });

    this.addEducation();
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

  submit() {
    this.router.navigate(["/profile"]);
  }
}
