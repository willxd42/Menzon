import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/services/post.service";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"]
})
export class BlogComponent implements OnInit {
  posts: any[];
  loading = true;
  error = false;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    return this.postService.getPosts({ rows: 10 }).subscribe(
      res => {
        (this.posts = res["rows"]), (this.loading = false);
      },
      err => {
        console.log(err), (this.error = true);
      }
    );
  }
}
