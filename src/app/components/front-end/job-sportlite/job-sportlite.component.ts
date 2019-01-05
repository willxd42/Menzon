import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  Input
} from "@angular/core";
import { NguCarousel, NguCarouselConfig } from "@ngu/carousel";

@Component({
  selector: "app-job-sportlite",
  templateUrl: "./job-sportlite.component.html",
  styleUrls: ["./job-sportlite.component.css"]
})
export class JobSportliteComponent implements OnInit, AfterViewInit {
  @Input() jobSportlite: any[];

  public carouselTile: NguCarouselConfig;

  @ViewChild("jobSportliteCarousel") jobSportliteCarousel: NguCarousel<any>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.carouselTile = {
      grid: {
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        all: 0
      },
      load: 3,
      interval: {
        timing: 4000,
        initialDelay: 1000
      },
      loop: true,
      touch: true,
      velocity: 0.2
    };
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
