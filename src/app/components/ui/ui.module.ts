import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { FooterComponent } from "./footer/footer.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ErrorComponent } from "./error/error.component";

@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    PageNotFoundComponent,
    ErrorComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    NavBarComponent,
    LoadingSpinnerComponent,
    FooterComponent,
    ErrorComponent
  ]
})
export class UiModule {}
