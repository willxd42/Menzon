import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GloberService {
  baseUrl: string;
  public change$: EventEmitter<any>;

  constructor() {
    this.change$ = new EventEmitter();
  }

  change() {
    console.log("emit");

    return this.change$.emit();
  }
}
