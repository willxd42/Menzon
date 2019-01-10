import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(payload) {
    return this.http.get(`${environment.BASE_URL}/public/posts/`, {
      params: payload
    });
  }
}
