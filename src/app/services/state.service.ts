import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class StateService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  constructor(private http: HttpClient) {}

  getState(paylad) {
    return this.http.get(`${environment.BASE_URL}/public/states/`, {
      params: paylad
    });
  }
}

// /public/image/ Get meia
// GET /public/media/ Get media, use toFileName to download a human readable name like Master Data.xlsx
// GET /public/options/ Search all Options
// GET /public/states/ Search all State
// GET /public/stream-event/upload-progress/{id}/ Get progress on upload using comet
// GET /public/stream-comet/upload-progress/{id}/ Get progress on upload using comet, functions is parent.processchanged
// GET /public/message_templates/{messageTemplateId}/ Get Message Template
