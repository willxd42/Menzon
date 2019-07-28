import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
// import { NotifyService } from "../services/notify.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = JSON.parse(localStorage.getItem("appUser"));
    if (user) {
      return true;
    } else {
      localStorage.setItem("notify", "Access denied please login"),
        this.router.navigate(["/login"], {
          queryParams: { returnUrl: state.url }
        });
      return false;
    }
  }
}
