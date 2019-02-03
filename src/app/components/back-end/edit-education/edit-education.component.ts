import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { monthOfTheYear } from "src/app/mock/months";
import { CountriesService } from "src/app/services/countries.service";
import { GloberService } from "src/app/services/glober.service";

@Component({
  selector: "app-edit-education",
  templateUrl: "./edit-education.component.html",
  styleUrls: ["./edit-education.component.css"]
})
export class EditEducationComponent implements OnInit {
  user: any;
  cRForm: FormGroup;
  loading: boolean;
  error: boolean;
  error2: boolean;
  education: any;
  allEducation: any[];
  months = monthOfTheYear;
  countries: any[];
  Submit = "Submit";
  check$: boolean;

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

  getUser() {
    const user = JSON.parse(localStorage.getItem("appUser"));
    this.userService.getSingleUserDetails(user.appUserId).subscribe(
      res => {
        this.user = res;
        this.allEducation = JSON.parse(res["education"]);
        this.education = JSON.parse(res["education"])[
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

  get educationForms() {
    return this.cRForm.get("education") as FormArray;
  }
  addEducation() {
    const education = this.fb.group({
      institution: ["", Validators.required],
      degree: ["", Validators.required],
      country: ["", Validators.required],
      fromYear: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)]
      ],
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
      this.cRForm.value.language.map(language => {
        if (language.proficiencyLevel !== "Not Applicable") {
          let d: any = {};
          d.language = language.language;
          d.proficiencyLevel = language.proficiencyLevel;
          d.dommy = `${language.language}-spoken`;
          return d;
        } else {
          let d: any = {};
          d.language = language.language;
          d.proficiencyLevel = language.proficiencyLevel;
          return d;
        }
      });

      this.Submit = "Loading...";
      this.error2 = false;
      const upload: FormData = new FormData();
      this.allEducation[
        this.route.snapshot.paramMap.get("id")
      ] = this.cRForm.value.education[0];

      this.user.education = JSON.stringify(this.allEducation);

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
