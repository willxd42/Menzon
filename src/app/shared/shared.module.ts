import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NgbModule,
  NgbPaginationModule,
  NgbAlertModule
} from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ArchwizardModule } from "angular-archwizard";
import { FroalaEditorModule, FroalaViewModule } from "angular-froala-wysiwyg";
import { MomentModule } from "ngx-moment";
import { NguCarouselModule } from "@ngu/carousel";
import { NgxPaginationModule } from "ngx-pagination";
import { DisqusModule } from "ngx-disqus";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

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
    NgxPaginationModule,
    NgbPaginationModule,
    NgbAlertModule,
    DisqusModule.forRoot("menzon"),
    NgMultiSelectDropDownModule.forRoot()
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
    NgxPaginationModule,
    NgbPaginationModule,
    NgbAlertModule,
    DisqusModule,
    NgMultiSelectDropDownModule
  ]
})
export class SharedModule {}
