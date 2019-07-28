import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { monthOfTheYear } from "src/app/mock/months";
import { skillLevel } from "src/app/mock/stillLevel";
import { GloberService } from "src/app/services/glober.service";

@Component({
  selector: "app-edit-skills",
  templateUrl: "./edit-skills.component.html",
  styleUrls: ["./edit-skills.component.css"]
})
export class EditSkillsComponent implements OnInit {
  user: any;
  cRForm: FormGroup;
  loading: boolean;
  error: boolean;
  error2: boolean;
  skills: any;
  allSkills: any[];
  months = monthOfTheYear;
  Submit = "Submit";
  check$: boolean;
  skillLevel = skillLevel;
  years = []

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
        this.allSkills = JSON.parse(res["skills"]);
        this.skills = JSON.parse(res["skills"])[
          this.route.snapshot.paramMap.get("id")
        ];

        this.allYear()
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
      lastYearUsed: [
        "",
        [Validators.required]
      ],
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
      this.allSkills[
        this.route.snapshot.paramMap.get("id")
      ] = this.cRForm.value.skills[0];

      this.user.skills = JSON.stringify(this.allSkills);

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
