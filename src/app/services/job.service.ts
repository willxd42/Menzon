import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { GloberService } from "./glober.service";

@Injectable({
  providedIn: "root"
})
export class JobService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("appUserToken")
    })
  };
  constructor(private http: HttpClient, public gS: GloberService) {
    this.gS.change$.subscribe(res => this.httpOptions);
  }

  getJobs(payload) {
    return this.http.get(`${environment.BASE_URL}/public/jobs/`, {
      params: payload
    });
  }

  applyForJob(payload) {
    return this.http.post(
      `${environment.BASE_URL}/users/${payload.appUserId}/candidate/jobs/${
        payload.jobId
      }/`,
      payload,
      this.httpOptions
    );
  }
}
