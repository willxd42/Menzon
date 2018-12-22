import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class FaqsService {
  constructor(private http: HttpClient) {}

  getFaqs(paylad) {
    return this.http.get(`${environment.BASE_URL}/public/faq/`, {
      params: paylad
    });
  }
}
