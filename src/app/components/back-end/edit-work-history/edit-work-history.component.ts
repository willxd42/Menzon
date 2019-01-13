import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { monthOfTheYear } from "src/app/mock/months";
import { UsersService } from "src/app/services/users.service";
import { CountriesService } from "src/app/services/countries.service";
import { GloberService } from 'src/app/services/glober.service';

@Component({
  selector: "app-edit-work-history",
  templateUrl: "./edit-work-history.component.html",
  styleUrls: ["./edit-work-history.component.css"]
})
export class EditWorkHistoryComponent implements OnInit {
  user: any;
  cRForm: FormGroup;
  loading: boolean;
  error: boolean;
  error2: boolean;
  workHistory: any;
  allWorkHistory: any[];
  months = monthOfTheYear;
  countries: any[];
  Submit = "Submit";
  check$: boolean;

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

  getUser() {
    const user = JSON.parse(localStorage.getItem("appUser"));
    this.userService.getSingleUserDetails(user.appUserId).subscribe(
      res => {
        this.user = res;
        this.allWorkHistory = JSON.parse(res["workHistory"]);
        this.workHistory = JSON.parse(res["workHistory"])[
          this.route.snapshot.paramMap.get("id")
        ];
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
      fromYear: ["", Validators.required],
      fromMonth: ["", Validators.required],
      toYear: ["", Validators.required],
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
      this.allWorkHistory[
        this.route.snapshot.paramMap.get("id")
      ] = this.cRForm.value.workHistory[0];

      this.user.workHistory = JSON.stringify(this.allWorkHistory);

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
