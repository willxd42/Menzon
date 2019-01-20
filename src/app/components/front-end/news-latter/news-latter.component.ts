import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-news-latter",
  templateUrl: "./news-latter.component.html",
  styleUrls: ["./news-latter.component.css"]
})
export class NewsLatterComponent implements OnInit {
  Form: FormGroup;
  selectedItems = [];
  Categories: any[];
  loading: boolean;
  error: boolean;
  error2: boolean;
  check$: boolean;
  success: boolean;
  Submit = "Submit";

  dropdownSettings = {
    singleSelection: false,
    idField: "id",
    textField: "name",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    allowSearchFilter: true,
    limitSelection: 3
  };

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getCategories();
    this.Form = new FormGroup({
      appUserEmail: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      ),
      categories: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  getCategories() {
    return this.categoryService
      .getCategorries({
        rows: 100
      })
      .subscribe(
        res => {
          this.Categories = res["rows"];
          this.loading = false;
        },
        err => {
          this.error = true;
        }
      );
  }

  get appUserEmail() {
    return this.Form.get("appUserEmail");
  }

  get categories() {
    return this.Form.get("categories");
  }

  check() {
    this.check$ = true;
  }

  onItemSelect(item: any) {
    this.selectedItems.push(item);
    this.Form.value.categories = this.selectedItems;
  }
  onSelectAll(items: any[]) {
    this.selectedItems.concat(items);
    this.Form.value.categories = this.selectedItems;
  }

  onDeSelect(item: any) {
    this.selectedItems.filter(i => {
      return i.idField != item.idField;
    });
    this.Form.value.categories = this.selectedItems;
  }

  onDeSelectAll(items: any[]) {
    this.selectedItems = [];
    this.Form.value.categories = this.selectedItems;
  }

  submit() {
    this.Submit = "Loading...";
    this.error = false;
    this.categoryService
      .newsLatter({
        categories: JSON.stringify(this.Form.value.categories),
        appUserEmail: this.Form.value.appUserEmail
      })
      .subscribe(
        res => {
          this.success = true;

          setTimeout(() => {
            this.success = false;
          }, 3000);
        },
        err => {
          this.error2 = true;
          this.Submit = "Failed! Please click to retry";

          setTimeout(() => {
            this.Submit = "Submit";
          }, 3000);
          console.log(err);
        }
      );
  }
}
