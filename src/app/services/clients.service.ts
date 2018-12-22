import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  getClients(paylad) {
    return this.http.get(`${environment.BASE_URL}/public/clients/`, {
      params: paylad
    });
  }
}
