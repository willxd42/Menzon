import { Component, OnInit } from "@angular/core";
import { JobService } from "src/app/services/job.service";
import { ActivatedRoute, Router } from "@angular/router";
import { GloberService } from "src/app/services/glober.service";
@Component({
  selector: "app-jobs-single",
  templateUrl: "./jobs-single.component.html",
  styleUrls: ["./jobs-single.component.css"]
})
export class JobsSingleComponent implements OnInit {
  job: any;
  loading: boolean;
  error: boolean;
  success: boolean;
  benefits: any[];
  user: any;
  submit = "Apply For This Job";
  canApply: boolean;
  error2: boolean;
  errMessage: any;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router,
    public globalService: GloberService
  ) {
    this.globalService.change$.subscribe(res => this.ngOnInit());
  }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("appUser"));
    this.loading = true;
    this.error = false;
    this.getJobs(1);
  }
  getJobs(pageNumber: number) {
    const searchFilters = {
      groupOp: "AND",
      rules: [
        {
          field: "id",
          op: "eq",
          data: this.route.snapshot.paramMap.get("id")
        }
      ]
    };
    const filters = JSON.stringify(searchFilters);
    this.loading = true;
    return this.jobService
      .getJobs({
        rows: 1,
        page: pageNumber,
        _search: true,
        filters: filters
      })
      .subscribe(
        res => {
          this.job = res["rows"][0];
          this.benefits = JSON.parse(this.job.benefits);
          this.checkForAppliedJob(this.job.id);
        },
        err => {
          console.log(err), (this.loading = false), (this.error = true);
        }
      );
  }
  apply(id: string) {
    this.submit = "appling";
    this.jobService
      .applyForJob({
        appUserId: this.user.appUserId,
        jobId: id
      })
      .subscribe(
        res => {
          this.submit = "Apply For This Job";
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 2000);
        },
        err => {
          this.submit = "Apply For This Job";
          this.error2 = true;
          this.errMessage = err["error"];
          setTimeout(() => {
            console.log(err);
            this.error2 = false;
          }, 2000);
        }
      );
  }

  checkForAppliedJob(id: string) {
    this.loading = true;
    this.jobService
      .checkForAppliedJob({
        appUserId: this.user.appUserId,
        jobId: id
      })
      .subscribe(
        res => {
          this.canApply = res["status"];
          this.loading = false;
        },
        err => {
          console.log(err);
          this.error2 = true;
          this.errMessage = err["error"];
          setTimeout(() => {
            console.log(err);
            this.error2 = false;
          }, 2000);
        }
      );
  }

  login() {
    localStorage.setItem("returnUrl", this.router.url);
    this.router.navigate([`/login`]);
  }
}
