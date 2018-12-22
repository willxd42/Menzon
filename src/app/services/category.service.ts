import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategorries(paylad) {
    return this.http.get(`${environment.BASE_URL}/public/categories/`, {
      params: paylad
    });
  }
}
