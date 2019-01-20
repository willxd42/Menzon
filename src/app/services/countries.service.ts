import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  getCountries(payload) {
    return this.http.get(`${environment.BASE_URL}/public/countries/`, {
      params: payload
    });
  }

  getDegree(payload) {
    return this.http.get(`${environment.BASE_URL}/public/degrees/`, {
      params: payload
    });
  }
}
