import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { BlogComponent } from "./blog/blog.component";
import { ContactComponent } from "./contact/contact.component";
import { FaqComponent } from "./faq/faq.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { BlogSingleComponent } from "./blog-single/blog-single.component";
import { CompleteRegistrationComponent } from "./complete-registration/complete-registration.component";

import { SharedModule } from "src/app/shared/shared.module";
import { JobsComponent } from "./jobs/jobs.component";
import { SearchComponent } from "./search/search.component";
import { UiModule } from "../ui/ui.module";
import { JobsSingleComponent } from "./jobs-single/jobs-single.component";
import { JobSportliteComponent } from "./job-sportlite/job-sportlite.component";
import { ClientsComponent } from "./clients/clients.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { CategoryComponent } from "./category/category.component";
import { NewsLatterComponent } from "./news-latter/news-latter.component";

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    BlogComponent,
    ContactComponent,
    FaqComponent,
    ForgotPasswordComponent,
    BlogSingleComponent,
    CompleteRegistrationComponent,
    JobsComponent,
    SearchComponent,
    JobsSingleComponent,
    JobSportliteComponent,
    ClientsComponent,
    VerifyEmailComponent,
    ResetPasswordComponent,
    CategoryComponent,
    NewsLatterComponent
  ],
  imports: [CommonModule, SharedModule, UiModule],
  exports: [NewsLatterComponent]
})
export class FrontEndModule {}
