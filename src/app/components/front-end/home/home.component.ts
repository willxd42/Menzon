import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { StateService } from "src/app/services/state.service";
import { JobService } from "src/app/services/job.service";
import { CategoryService } from "src/app/services/category.service";
import { ClientsService } from "src/app/services/clients.service";
import { PostService } from "src/app/services/post.service";
import { Router } from "@angular/router";
import { ExperienceService } from "src/app/services/experience.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  states: any[];
  jobs: any[];
  jobSportlite: any[];
  clients: any[];
  categories: any[];
  posts: any[];
  exp: any[];
  searchForm: FormGroup;
  error: boolean;
  error2: boolean;
  loading: boolean;
  constructor(
    private stateService: StateService,
    private jobService: JobService,
    private categoryService: CategoryService,
    private clientService: ClientsService,
    private postService: PostService,
    private expirenceService: ExperienceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.error = false;
    this.getAll();
    this.searchForm = new FormGroup({
      title: new FormControl("", Validators.compose([Validators.required])),
      state: new FormControl("", Validators.compose([Validators.required])),
      experience: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  async getAll() {
    await this.getState();
  }
  getState() {
    return this.stateService
      .getState({
        rows: 1000,
        sord: "asc"
      })
      .subscribe(
        res => {
          this.states = res["rows"];
          this.getCategories();
        },
        err => {
          this.error = true;
          this.loading = false;
        }
      );
  }
  getJobs() {
    return this.jobService
      .getJobs({
        rows: 5
      })
      .subscribe(
        res => {
          this.jobs = res["rows"];
          this.getJobSportlite();
        },
        err => {
          this.error = true;
          this.loading = false;
        }
      );
  }
  getJobSportlite() {
    return this.jobService
      .getJobs({
        rows: 3,
        sord: "desc",
        sdix: "salaryMax"
      })
      .subscribe(
        res => {
          this.jobSportlite = res["rows"];
          this.getPosts();
        },
        err => {
          this.error = true;
          this.loading = false;
        }
      );
  }
  getCategories() {
    return this.categoryService
      .getCategorries({
        rows: 1000
      })
      .subscribe(
        res => {
          this.categories = res["rows"];
          this.getJobs();
        },
        err => {
          this.error = true;
          this.loading = false;
        }
      );
  }
  getPosts() {
    return this.postService
      .getPosts({
        rows: 3
      })
      .subscribe(
        res => {
          this.posts = res["rows"];
          this.getClients();
        },
        err => {
          this.error = true;
          this.loading = false;
        }
      );
  }
  getClients() {
    return this.clientService
      .getClients({
        rows: 1000
      })
      .subscribe(
        res => {
          this.clients = res["rows"];
          this.getExperience();
        },
        err => {
          this.error = true;
          this.loading = false;
        }
      );
  }
  getExperience() {
    return this.expirenceService
      .getExperience({
        rows: 1000
      })
      .subscribe(
        res => {
          this.exp = res["rows"];
          this.loading = false;
        },
        err => {
          this.error = true;
          this.loading = false;
        }
      );
  }
  get title() {
    return this.searchForm.get("title");
  }
  get state() {
    return this.searchForm.get("state");
  }
  get experience() {
    return this.searchForm.get("experience");
  }
  submit() {
    return this.searchForm.valid ? this.search() : this.initError();
  }
  search() {
    const searchFilter = {
      groupOp: "AND",
      rules: [
        {
          field: "title",
          op: "cn",
          data: this.searchForm.value.title
        },
        {
          field: "state",
          op: "eq",
          data: this.searchForm.value.state
        },
        {
          field: "experienceLevel.name",
          op: "eq",
          data: this.searchForm.value.experience
        }
      ]
    };
    localStorage.setItem("searchFilter", JSON.stringify(searchFilter));
    this.router.navigate(["/jobs"]);
  }

  searchCategory(val: string) {
    const searchFilter = {
      groupOp: "AND",
      rules: [
        {
          field: "jobFunction.id",
          op: "eq",
          data: val
        }
      ]
    };
    localStorage.setItem("searchFilter", JSON.stringify(searchFilter));
    this.router.navigate(["/jobs"]);
  }

  initError() {
    console.log("yes");
    this.error2 = true;
    setTimeout(() => (this.error2 = false), 4000);
  }
}
