import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/services/post.service";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"]
})
export class BlogComponent implements OnInit {
  posts: any[];
  page: number;
  records: number;
  total: any[];
  loading: boolean;
  error = false;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loading = true;
    this.error = false
    this.getPosts(1);
  }

  getPosts(pageNumber: number) {
    return this.postService.getPosts({ rows: 10, page: pageNumber }).subscribe(
      res => {
        this.posts = res["rows"];
        this.records = res["records"];
        this.page = Number(res["page"]);
        this.loading = false;
        this.error = false
      },
      err => {
        console.log(err), (this.error = true);
      }
    );
  }

  currentPage(page: number) {
    return this.getPosts(page);
  }
}
