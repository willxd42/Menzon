import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { monthOfTheYear } from "src/app/mock/months";
import { CountriesService } from "src/app/services/countries.service";
import { GloberService } from "src/app/services/glober.service";

@Component({
  selector: "app-edit-language",
  templateUrl: "./edit-language.component.html",
  styleUrls: ["./edit-language.component.css"]
})
export class EditLanguageComponent implements OnInit {
  user: any;
  cRForm: FormGroup;
  loading: boolean;
  error: boolean;
  error2: boolean;
  language: any;
  allLanguage: any[];
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
    this.getUser();
    this.cRForm = this.fb.group({
      language: this.fb.array([])
    });

    this.addLanguage();
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem("appUser"));
    this.userService.getSingleUserDetails(user.appUserId).subscribe(
      res => {
        this.user = res;
        this.allLanguage = JSON.parse(res["languages"]);
        this.language = JSON.parse(res["languages"])[
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

  get languageForms() {
    return this.cRForm.get("language") as FormArray;
  }

  addLanguage() {
    const language = this.fb.group({
      language: ["", Validators.required],
      proficiencyLevel: ["", Validators.required]
    });

    this.languageForms.push(language);
  }

  deleteLanguage(i) {
    this.languageForms.removeAt(i);
  }

  check() {
    this.check$ = true;
  }

  submit() {
    if (this.languageForms.invalid) {
      this.check$ = true;
    } else {
      this.Submit = "Loading...";
      this.error2 = false;
      const upload: FormData = new FormData();
      this.allLanguage[
        this.route.snapshot.paramMap.get("id")
      ] = this.cRForm.value.language[0];

      this.user.languages = JSON.stringify(this.allLanguage);

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
