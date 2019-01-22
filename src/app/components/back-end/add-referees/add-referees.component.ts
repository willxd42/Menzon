import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { monthOfTheYear } from "src/app/mock/months";
import { CountriesService } from "src/app/services/countries.service";
import { GloberService } from "src/app/services/glober.service";

@Component({
  selector: "app-add-referees",
  templateUrl: "./add-referees.component.html",
  styleUrls: ["./add-referees.component.css"]
})
export class AddRefereesComponent implements OnInit {
  user: any;
  cRForm: FormGroup;
  loading: boolean;
  error: boolean;
  error2: boolean;
  allReferees: any[];
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
      referees: this.fb.array([])
    });

    this.addReferees();
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem("appUser"));
    this.userService.getSingleUserDetails(user.appUserId).subscribe(
      res => {
        this.user = res;
        this.allReferees = JSON.parse(res["referees"]);
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

  get refereesForms() {
    return this.cRForm.get("referees") as FormArray;
  }

  addReferees() {
    const referees = this.fb.group({
      name: ["", Validators.required],
      designation: ["", Validators.required],
      company: ["", Validators.required],
      country: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", Validators.required],
      id: ["", Validators.required]
    });

    this.refereesForms.push(referees);
  }

  deleteReferees(i) {
    this.refereesForms.removeAt(i);
  }

  check() {
    this.check$ = true;
  }

  submit() {
    if (this.refereesForms.invalid) {
      this.check$ = true;
    } else {
      this.Submit = "Loading...";
      this.error2 = false;
      const upload: FormData = new FormData();

      if (this.allReferees && this.allReferees.length > 0) {
        const finalReferees = [
          ...this.allReferees,
          ...this.cRForm.value.referees
        ];
  
        this.user.referees = JSON.stringify(finalReferees);
  
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
        const finalReferees = [
        
          ...this.cRForm.value.referees
        ];
  
        this.user.referees = JSON.stringify(finalReferees);
  
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
