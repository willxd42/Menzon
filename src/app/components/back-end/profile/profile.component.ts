import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  loading: boolean;
  error: boolean;
  user: any;
  skills: any[]
  education: any[]
  workHistory: any[]

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.loading = true;
    const user = JSON.parse(localStorage.getItem("appUser"));
    this.userService.getSingleUserDetails(user.appUserId).subscribe(
      res => {
        console.log(res);
        this.user = res
        this.skills = JSON.parse(res['skills']) 
        this.education = JSON.parse(res['education']) 
        this.workHistory = JSON.parse(res['workHistory']) 
        this.loading = false;
      },
      err => {
        console.log(err);
        this.error = true;
        this.loading = false;
      }
    );
  }
}
