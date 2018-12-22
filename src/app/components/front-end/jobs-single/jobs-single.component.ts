import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobs-single',
  templateUrl: './jobs-single.component.html',
  styleUrls: ['./jobs-single.component.css']
})
export class JobsSingleComponent implements OnInit {
  job: any;
  loading = true;
  error = false;

  constructor(private jobService: JobService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getJobs(1);
  }

  getJobs(pageNumber: number) {
    const searchFilters = {
      groupOp: "AND",
      rules: [
        {
          field: "id",
          option: "eq",
          data: this.route.snapshot.paramMap.get("id")
        }
      ]
    };

    const filters = JSON.stringify(searchFilters);
    this.loading = true;
    return this.jobService
      .getJobs({
        rows: 10,
        page: pageNumber,
        _search: true,
        filters: filters
      })
      .subscribe(
        res => {
          (this.job = res["rows"]), (this.loading = false);
        },
        err => {
          console.log(err), (this.loading = false), (this.error = true);
        }
      );
  }
}
