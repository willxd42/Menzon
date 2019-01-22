import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { monthOfTheYear } from "src/app/mock/months";
import { skillLevel } from "src/app/mock/stillLevel";
import { GloberService } from "src/app/services/glober.service";

@Component({
  selector: "app-add-skill",
  templateUrl: "./add-skill.component.html",
  styleUrls: ["./add-skill.component.css"]
})
export class AddSkillComponent implements OnInit {
  user: any;
  cRForm: FormGroup;
  loading: boolean;
  error: boolean;
  error2: boolean;
  allSkills: any[];
  months = monthOfTheYear;
  Submit = "Submit";
  check$: boolean;
  skillLevel = skillLevel;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private route: ActivatedRoute,
    public globalService: GloberService
  ) {
    this.globalService.change$.subscribe(res => this.ngOnInit());
  }

  ngOnInit() {
    this.loading = true;
    this.error = false;

    this.getUser();

    this.cRForm = this.fb.group({
      skills: this.fb.array([])
    });

    this.addSkill();
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem("appUser"));
    this.userService.getSingleUserDetails(user.appUserId).subscribe(
      res => {
        this.user = res;
        this.allSkills = JSON.parse(res["skills"]);

        this.loading = false;
      },
      err => {
        console.log(err);
        this.error = true;
        this.loading = false;
      }
    );
  }

  get skillsForms() {
    return this.cRForm.get("skills") as FormArray;
  }

  addSkill() {
    const skill = this.fb.group({
      skill: ["", Validators.required],
      skillLevel: ["", Validators.required],
      lastYearUsed: ["", Validators.required],
      lastMonthUsed: ["", Validators.required],
      yearsOfExperience: ["", Validators.required]
    });

    this.skillsForms.push(skill);
  }

  deleteSkill(i) {
    this.skillsForms.removeAt(i);
  }

  check() {
    this.check$ = true;
  }

  submit() {
    if (this.skillsForms.invalid) {
      this.check$ = true;
    } else {
      this.Submit = "Loading...";
      this.error2 = false;
      const upload: FormData = new FormData();

      if (this.allSkills && this.allSkills.length > 0) {
        const finalSkills = [...this.allSkills, ...this.cRForm.value.skills];

        this.user.skills = JSON.stringify(finalSkills);

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
        const finalSkills = [...this.cRForm.value.skills];

        this.user.skills = JSON.stringify(finalSkills);

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
