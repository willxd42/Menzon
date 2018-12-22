import { Component, OnInit } from "@angular/core";
import { JobService } from "src/app/services/job.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.css"]
})
export class JobsComponent implements OnInit {
  jobs: any[];
  loading = true;
  error = false;
  search = new FormControl();
  filters: string;
  _search: boolean;
  searchFilter = {
    groupOp: "OR",
    rules: [
      {
        field: "title",
        op: "cn",
        data: ""
      },
      {
        field: "employementType.name",
        op: "cn",
        data: ""
      },
      {
        field: "country.name",
        op: "cn",
        data: ""
      },
      {
        field: "salaryMin",
        op: "cn",
        data: ""
      },
      {
        field: "salaryMax",
        op: "cn",
        data: ""
      },
      {
        field: "state",
        op: "cn",
        data: ""
      }
    ]
  };

  constructor(private jobService: JobService) {
    this.search.valueChanges.subscribe(value => {
      this.searchFilter.rules.map(
        rule => (rule.data = value),
        (this.filters = JSON.stringify(this.searchFilter))
      );

      this.getJobs(1);
    });
  }

  ngOnInit() {
    this._search = false;
    this.getJobs(1);
  }

  getJobs(pageNumber: number) {
    this.loading = true;
    const localSearchFilter: string = localStorage.getItem("searchFilter");

    if (localSearchFilter.length > 1) {
      return this.jobService
        .getJobs({
          rows: 10,
          page: pageNumber,
          _search: this._search,
          filters: localSearchFilter
        })
        .subscribe(
          res => {
            this.jobs = res["rows"];
            this.loading = false;
            localStorage.removeItem("searchFilter");
          },
          err => {
            console.log(err), (this.loading = false), (this.error = true);
          }
        );
    } else {
    }
    return this.jobService
      .getJobs({
        rows: 10,
        page: pageNumber,
        _search: this._search,
        filters: this.filters
      })
      .subscribe(
        res => {
          (this.jobs = res["rows"]), (this.loading = false);
        },
        err => {
          console.log(err), (this.loading = false), (this.error = true);
        }
      );
  }
}
