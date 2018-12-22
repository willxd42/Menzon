import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-edit-work-history",
  templateUrl: "./edit-work-history.component.html",
  styleUrls: ["./edit-work-history.component.css"]
})
export class EditWorkHistoryComponent implements OnInit {
  cRForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.cRForm = this.fb.group({
      workHistroy: this.fb.array([])
    });

    this.addWorkHistory();
  }

  get workHistoryForms() {
    return this.cRForm.get("workHistory") as FormArray;
  }

  addWorkHistory() {
    const work = this.fb.group({
      company: [],
      jobTitle: [],
      country: [],
      fromYear: [],
      fromMonth: [],
      toYear: [],
      toMonth: []
    });

    console.log(work);

    this.workHistoryForms.push(work);
  }

  deleteWorkHistory(i) {
    this.workHistoryForms.removeAt(i);
  }

  submit() {
    this.router.navigate(["/profile"]);
  }
}
