import { Component, OnInit } from "@angular/core";
import { FaqsService } from "src/app/services/faqs.service";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.css"]
})
export class FaqComponent implements OnInit {
  faq: any[];
  loading: boolean;
  error: boolean
  constructor(private faqService: FaqsService) {}

  ngOnInit() {
    this.loading = true
    this.error = false
    this.getFaq();
  }

  getFaq() {
    return this.faqService.getFaqs({ rows: 1000 }).subscribe(
      res => {
        this.faq = res["rows"];
        this.loading = false;
      },
      err => {
        console.log(err), (this.error = true);
      }
    );
  }
}
