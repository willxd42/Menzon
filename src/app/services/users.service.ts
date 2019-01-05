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
      Authorization: localStorage.getItem("token")
    })
  };

  httpOptionsForMultipartData = {
    headers: new HttpHeaders({
      Authorization: localStorage.getItem("token")
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
    return this.http.post(
      `${environment.BASE_URL}/auth/login/`,
      payload,
      this.httpOptions
    );
  }

  completeRegistration(payload) {
    return this.http.put(
      `${environment.BASE_URL}/users/${payload.appUserId}/candidate/`,
      payload.body,
      this.httpOptionsForMultipartData
    );
  }
}
