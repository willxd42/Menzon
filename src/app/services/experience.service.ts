import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ExperienceService {
  constructor(private http: HttpClient) {}

  getExperience(payload) {
    return this.http.get(`${environment.BASE_URL}/public/experience/`, {
      params: payload
    });
  }
}
