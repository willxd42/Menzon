import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.css"]
})
export class ErrorComponent {
  @Output() reload = new EventEmitter();

  try() {
    this.reload.emit();
  }
}
