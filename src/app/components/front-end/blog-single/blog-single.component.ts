import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/services/post.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-blog-single",
  templateUrl: "./blog-single.component.html",
  styleUrls: ["./blog-single.component.css"]
})
export class BlogSingleComponent implements OnInit {
  post: any;
  loading = true;
  error = false;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.loading = true
    
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

    return this.postService
      .getPosts({ rows: 10, _search: true, filters: filters })
      .subscribe(
        res => {
          this.post = res["rows"];
          this.loading = false;
          console.log(res);
        },
        err => {
          console.log(err), (this.error = true);
        }
      );
  }
}
