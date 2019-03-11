import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { monthOfTheYear } from "src/app/mock/months";
import { CountriesService } from "src/app/services/countries.service";
import { GloberService } from "src/app/services/glober.service";

@Component({
  selector: "app-add-education",
  templateUrl: "./add-education.component.html",
  styleUrls: ["./add-education.component.css"]
})
export class AddEducationComponent implements OnInit {
  user: any;
  cRForm: FormGroup;
  loading: boolean;
  error: boolean;
  error2: boolean;
  allEducation: any[];
  months = monthOfTheYear;
  countries: any[];
  Submit = "Submit";
  check$: boolean;
  degree: any[];
  years = [];
  year = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private countryService: CountriesService,
    private userService: UsersService,
    public globalService: GloberService
  ) {
    this.globalService.change$.subscribe(res => this.ngOnInit());
  }

  ngOnInit() {
    this.getCountries();
    this.cRForm = this.fb.group({
      education: this.fb.array([])
    });

    this.addEducation();
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
        this.allEducation = JSON.parse(res["education"]);
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
        this.getDegree();
      },
      err => {
        this.error = true;
        this.loading = false;
      }
    );
  }

  getDegree() {
    return this.countryService.getDegree({ rows: 1000 }).subscribe(
      res => {
        this.degree = res["rows"];
        this.getUser();
      },
      err => {
        this.error = true;
        this.loading = false;
      }
    );
  }

  get educationForms() {
    return this.cRForm.get("education") as FormArray;
  }
  addEducation() {
    const education = this.fb.group({
      institution: ["", Validators.required],
      degree: ["", Validators.required],
      country: ["", Validators.required],
      fromYear: ["", [Validators.required]],
      fromMonth: ["", Validators.required],
      toYear: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)]
      ],
      toMonth: ["", Validators.required],
      course: ["", Validators.required]
    });

    this.educationForms.push(education);
  }

  deleteEducation(i) {
    this.educationForms.removeAt(i);
  }

  check() {
    this.check$ = true;
  }

  submit() {
    if (this.educationForms.invalid) {
      this.check$ = true;
    } else {
      this.Submit = "Loading...";
      this.error2 = false;
      const upload: FormData = new FormData();

      if (this.allEducation && this.allEducation.length > 0) {
        const finalEducation = [
          ...this.allEducation,
          ...this.cRForm.value.education
        ];

        this.user.education = JSON.stringify(finalEducation);

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
        const finalEducation = [...this.cRForm.value.education];

        this.user.education = JSON.stringify(finalEducation);

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
