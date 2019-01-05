import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ArchwizardModule } from "angular-archwizard";
import { FroalaEditorModule, FroalaViewModule } from "angular-froala-wysiwyg";
import { MomentModule } from "ngx-moment";
import { NguCarouselModule } from "@ngu/carousel";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ArchwizardModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    MomentModule,
    NguCarouselModule,
    NgxPaginationModule
  ],
  exports: [
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ArchwizardModule,
    FroalaEditorModule,
    FroalaViewModule,
    MomentModule,
    NguCarouselModule,
    NgxPaginationModule
  ]
})
export class SharedModule {}
