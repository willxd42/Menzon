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
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"]
})

export class ClientsComponent implements OnInit, AfterViewInit {
  
  @Input() clients: any[];

  public carouselTile: NguCarouselConfig;

  @ViewChild("clientsCarousel") clientsCarousel: NguCarousel<any>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.carouselTile = {
      grid: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
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
