import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-edit-skills",
  templateUrl: "./edit-skills.component.html",
  styleUrls: ["./edit-skills.component.css"]
})
export class EditSkillsComponent implements OnInit {
  cRForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.cRForm = this.fb.group({
      skills: this.fb.array([])
    });
    this.addSkill();
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

    console.log(skill);

    this.skillsForms.push(skill);
  }

  deleteSkill(i) {
    this.skillsForms.removeAt(i);
  }

  submit() {
    this.router.navigate(["/profile"]);
  }
}
