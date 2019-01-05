import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  getCountries(paylad) {
    return this.http.get(`${environment.BASE_URL}/public/countries/`, {
      params: paylad
    });
  }
}
