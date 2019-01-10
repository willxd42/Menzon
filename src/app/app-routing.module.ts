import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/front-end/home/home.component";
import { RegisterComponent } from "./components/front-end/register/register.component";
import { LoginComponent } from "./components/front-end/login/login.component";
import { BlogComponent } from "./components/front-end/blog/blog.component";
import { FaqComponent } from "./components/front-end/faq/faq.component";
import { ContactComponent } from "./components/front-end/contact/contact.component";
import { ForgotPasswordComponent } from "./components/front-end/forgot-password/forgot-password.component";
import { BlogSingleComponent } from "./components/front-end/blog-single/blog-single.component";
import { CompleteRegistrationComponent } from "./components/front-end/complete-registration/complete-registration.component";
import { PageNotFoundComponent } from "./components/ui/page-not-found/page-not-found.component";
import { ProfileComponent } from "./components/back-end/profile/profile.component";
import { EditProfileComponent } from "./components/back-end/edit-profile/edit-profile.component";
import { EditWorkHistoryComponent } from "./components/back-end/edit-work-history/edit-work-history.component";
import { EditSkillsComponent } from "./components/back-end/edit-skills/edit-skills.component";
import { EditEducationComponent } from "./components/back-end/edit-education/edit-education.component";
import { JobsComponent } from "./components/front-end/jobs/jobs.component";
import { JobsSingleComponent } from './components/front-end/jobs-single/jobs-single.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "jobs",
    component: JobsComponent
  },
  {
    path: "job/:id",
    component: JobsSingleComponent
  },
  {
    path: "blog",
    component: BlogComponent
  },
  {
    path: "blog/:id",
    component: BlogSingleComponent
  },
  {
    path: "faq",
    component: FaqComponent
  },
  {
    path: "contact",
    component: ContactComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "complete-registration",
    component: CompleteRegistrationComponent
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "edit-profile",
    component: EditProfileComponent
  },
  {
    path: "edit-work-history/:id",
    component: EditWorkHistoryComponent
  },
  {
    path: "edit-skill/:id",
    component: EditSkillsComponent
  },
  {
    path: "edit-education/:id",
    component: EditEducationComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
