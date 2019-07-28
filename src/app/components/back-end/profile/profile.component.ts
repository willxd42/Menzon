import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { CountriesService } from "src/app/services/countries.service";
import { GloberService } from "src/app/services/glober.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  loading: boolean;
  error: boolean;
  user: any;
  skills: any[];
  education: any[];
  workHistory: any[];
  referees: any[];
  contries: any;
  photo: any;
  constructor(
    private userService: UsersService,
    private countryService: CountriesService,
    public globalService: GloberService
  ) {
    this.globalService.change$.subscribe(res => this.getUser());
  }

  ngOnInit() {
    this.loading = true;
    this.error = false;
    this.getUser();
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem("appUser"));
    if (user) {
      this.userService.getSingleUserDetails(user.appUserId).subscribe(
        res => {
          this.user = res;
          this.skills = JSON.parse(res["skills"]);
          this.education = JSON.parse(res["education"]);
          this.referees = JSON.parse(res["referees"]);
          this.workHistory = JSON.parse(res["workHistory"]);
          this.photo = `${environment.BASE_URL}/public/image/?media=${
            this.user.profileImage
          }`;
          console.log(this.user);
          this.getCountries();
        },
        err => {
          console.log(err);
          this.error = true;
          this.loading = false;
        }
      );
    } else {
      window.location.reload();
    }
  }

  getCountries() {
    this.error = false;
    const searchFilter = {
      groupOp: "AND",
      rules: [
        {
          field: "code",
          op: "eq",
          data: this.user.country
        }
      ]
    };
    return this.countryService
      .getCountries({
        rows: 1,
        page: 1,
        _search: true,
        filters: JSON.stringify(searchFilter)
      })
      .subscribe(
        res => {
          this.contries = res["rows"][0];

          this.loading = false;
        },
        err => {
          this.error = true;
          this.loading = false;
        }
      );
  }
}
