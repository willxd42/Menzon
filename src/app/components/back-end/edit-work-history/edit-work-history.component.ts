import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { monthOfTheYear } from "src/app/mock/months";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-edit-work-history",
  templateUrl: "./edit-work-history.component.html",
  styleUrls: ["./edit-work-history.component.css"]
})
export class EditWorkHistoryComponent implements OnInit {
  cRForm: FormGroup;
  user: any;
  months = monthOfTheYear;
  workHistory: any;
  loading: boolean;
  error: boolean;
  error2: boolean;
  check$: boolean;
  Submit = "Submit";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getUser();
    this.cRForm = this.fb.group({
      workHistory: this.fb.array([])
    });

    this.addWorkHistory();
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem("appUser"));
    this.userService.getSingleUserDetails(user.appUserId).subscribe(
      res => {
        this.user = res;
        this.workHistory = JSON.parse(res["workHistory"])[
          this.route.snapshot.paramMap.get("id")
        ];

        this.loading = false;
      },
      err => {
        console.log(err);
        this.error = true;
        this.loading = false;
      }
    );
  }

  get workHistoryForms() {
    return this.cRForm.get("workHistory") as FormArray;
  }

  addWorkHistory() {
    const workHistory = this.fb.group({
      company: ["", Validators.required],
      jobTitle: ["", Validators.required],
      country: ["", Validators.required],
      fromYear: ["", Validators.required, Validators.min(4), Validators.max(4)],
      fromMonth: ["", Validators.required],
      toYear: ["", Validators.required, Validators.min(4), Validators.max(4)],
      toMonth: ["", Validators.required]
    });

    this.workHistoryForms.push(workHistory);
  }

  deleteWorkHistory(i) {
    this.workHistoryForms.removeAt(i);
  }

  check() {
    this.check$ = true;
  }

  submit() {
    if (this.workHistoryForms.invalid) {
      this.check$ = true;
    } else {
      this.Submit = "Loading...";
      this.error2 = false;
      const upload: FormData = new FormData();
      const jsonse = JSON.stringify({
        cvTitle: "My Cv",
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        workHistory: JSON.stringify(this.cRForm.value.workHistory)
      });
      const data = new Blob([jsonse], { type: "application/json" });
      upload.append("data", data);

      this.userService
        .completeRegistration({
          appUserId: JSON.parse(localStorage.getItem("appUser")).appUserId,
          body: upload
        })
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(["/profile"]);
          },
          err => {
            console.log(err);
            this.Submit = "Submit";
            this.error2 = true;
          }
        );
    }
  }
}
