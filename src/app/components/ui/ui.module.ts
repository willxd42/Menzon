import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { FooterComponent } from "./footer/footer.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { RouterModule } from "@angular/router";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [NavBarComponent, FooterComponent, LoadingSpinnerComponent, PageNotFoundComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavBarComponent, LoadingSpinnerComponent, FooterComponent]
})
export class UiModule {}
