import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {
  loading: boolean;
  error: boolean;
  categories: any[];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loading = true;
    this.error = false;

    this.getCategories();
  }

  getCategories() {
    return this.categoryService
      .getCategorries({
        rows: 2000
      })
      .subscribe(
        res => {
          this.categories = res["rows"];
          this.loading = false;
        },
        err => {
          this.error = true;
          this.loading = false;
        }
      );
  }
}
