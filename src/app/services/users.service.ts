import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { GloberService } from "./glober.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.getToken()
    })
  };

  httpOptionsForMultipartData = {
    headers: new HttpHeaders({
      Authorization: this.getToken()
    })
  };
  constructor(private http: HttpClient, public gS: GloberService) {
    this.getToken();
    this.gS.change$.subscribe(res => {
      this.httpOptions;
      this.httpOptionsForMultipartData;
      this.getToken();
    });
  }

  getToken() {
    return localStorage.getItem("appUserToken");
  }

  registerUser(payload) {
    return this.http.post(`${environment.BASE_URL}/auth/sign-up/`, payload, {
      headers: {
        Authorization: this.getToken()
      }
    });
  }

  forgotPassword(payload) {
    return this.http.post(
      `${environment.BASE_URL}/auth/reset-password/${payload}/`,
      payload
    );
  }

  loginUser(payload) {
    return this.http.post(`${environment.BASE_URL}/auth/login/`, payload);
  }

  completeRegistration(payload) {
    return this.http.put(
      `${environment.BASE_URL}/users/${payload.appUserId}/candidate/`,
      payload.body,
      {
        headers: {
          Authorization: this.getToken()
        }
      }
    );
  }

  getSingleUserDetails(payload) {
    return this.http.get(
      `${environment.BASE_URL}/users/${payload}/candidate/`,
      {
        headers: {
          Authorization: this.getToken()
        }
      }
    );
  }

  verifyEmail(payload) {
    return this.http.put(
      `${
        environment.BASE_URL
      }/auth/finalize_email_verification/?token=${payload}`,
      { token: payload }
    );
  }

  resetPassword(payload) {
    return this.http.put(
      `${environment.BASE_URL}/auth/reset-password/`,
      payload
    );
  }

  resendEmailVerification(payload) {
    return this.http.put(
      `${environment.BASE_URL}/users/${payload}/initate_email_verification/`,
      payload,
      {
        headers: {
          Authorization: this.getToken()
        }
      }
    );
  }

  contactUs(payload) {
    return this.http.post(
      `${environment.BASE_URL}/public/contact-us/`,
      payload
    );
  }
}
