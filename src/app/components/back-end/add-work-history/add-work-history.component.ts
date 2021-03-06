import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { monthOfTheYear } from "src/app/mock/months";
import { UsersService } from "src/app/services/users.service";
import { CountriesService } from "src/app/services/countries.service";
import { GloberService } from "src/app/services/glober.service";

@Component({
  selector: "app-add-work-history",
  templateUrl: "./add-work-history.component.html",
  styleUrls: ["./add-work-history.component.css"]
})
export class AddWorkHistoryComponent implements OnInit {
  user: any;
  cRForm: FormGroup;
  loading: boolean;
  error: boolean;
  error2: boolean;
  allWorkHistory: any[];
  months = monthOfTheYear;
  countries: any[];
  Submit = "Submit";
  check$: boolean;
  years = [];
  year = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private route: ActivatedRoute,
    private countryService: CountriesService,
    public globalService: GloberService
  ) {
    this.globalService.change$.subscribe(res => this.ngOnInit());
  }

  ngOnInit() {
    this.getCountries();
    this.cRForm = this.fb.group({
      workHistory: this.fb.array([])
    });

    this.addWorkHistory();
  }

  allYear() {
    var max = new Date().getFullYear();
    var min = max - 79;
    for (var i = min; i <= max; i++) {
      this.years.push(i);
      this.loading = false;
    }

    this.years.sort();
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem("appUser"));
    this.userService.getSingleUserDetails(user.appUserId).subscribe(
      res => {
        this.user = res;
        this.allWorkHistory = JSON.parse(res["workHistory"]);
        this.allYear();
      },
      err => {
        console.log(err);
        this.error = true;
        this.loading = false;
      }
    );
  }

  getCountries() {
    this.loading = true;
    return this.countryService.getCountries({ rows: 1000 }).subscribe(
      res => {
        this.countries = res["rows"];
        this.getUser();
      },
      err => {
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
      fromYear: ["", [Validators.required]],
      fromMonth: ["", Validators.required],
      toYear: ["", [Validators.required]],
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

      if (this.allWorkHistory && this.allWorkHistory.length > 0) {
        const finalWorkHistory = [
          ...this.allWorkHistory,
          ...this.cRForm.value.workHistory
        ];

        this.user.workHistory = JSON.stringify(finalWorkHistory);

        const jsonse = JSON.stringify(this.user);
        console.log(jsonse);

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
      } else {
        const finalWorkHistory = [...this.cRForm.value.workHistory];

        this.user.workHistory = JSON.stringify(finalWorkHistory);

        const jsonse = JSON.stringify(this.user);
        console.log(jsonse);

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
}
