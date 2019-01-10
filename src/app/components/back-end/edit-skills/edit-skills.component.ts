import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { monthOfTheYear } from "src/app/mock/months";
import { skillLevel } from "src/app/mock/stillLevel";

@Component({
  selector: "app-edit-skills",
  templateUrl: "./edit-skills.component.html",
  styleUrls: ["./edit-skills.component.css"]
})
export class EditSkillsComponent implements OnInit {
  cRForm: FormGroup;
  loading: boolean;
  error: boolean;
  user: any;
  Submit = "Submit";
  error2: boolean;
  skills: any;
  check$: boolean;
  months = monthOfTheYear;
  skillLevel = skillLevel;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private route: ActivatedRoute
  ) {}

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
        this.skills = JSON.parse(res["skills"])[
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

  get skillsForms() {
    return this.cRForm.get("skills") as FormArray;
  }

  addSkill() {
    const skill = this.fb.group({
      skill: ["", Validators.required],
      skillLevel: ["", Validators.required],
      lastYearUsed: [
        "",
        Validators.required,
        Validators.min(4),
        Validators.max(4)
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
      const jsonse = JSON.stringify({
        cvTitle: "My Cv",
        firstName: this.user.firstName,
        lastName:   this.user.lastName,
        skills: JSON.stringify(this.cRForm.value.skills)
      });
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
