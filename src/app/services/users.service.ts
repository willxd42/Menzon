import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("appUserToken")
    })
  };

  httpOptionsForMultipartData = {
    headers: new HttpHeaders({
      Authorization: localStorage.getItem("appUserToken")
    })
  };
  constructor(private http: HttpClient) {}

  registerUser(payload) {
    return this.http.post(
      `${environment.BASE_URL}/auth/sign-up/`,
      payload,
      this.httpOptions
    );
  }

  forgotPassword(payload) {
    return this.http.post(
      `${environment.BASE_URL}/auth/reset-password/${payload}/`,
      payload,
      this.httpOptions
    );
  }

  loginUser(payload) {
    return this.http.post(`${environment.BASE_URL}/auth/login/`, payload);
  }

  completeRegistration(payload) {
    return this.http.put(
      `${environment.BASE_URL}/users/${payload.appUserId}/candidate/`,
      payload.body,
      this.httpOptionsForMultipartData
    );
  }

  getSingleUserDetails(payload) {
    return this.http.get(
      `${environment.BASE_URL}/users/${payload}/candidate/`,
      this.httpOptions
    );
  }
}
