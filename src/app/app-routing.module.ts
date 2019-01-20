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
import { JobsSingleComponent } from "./components/front-end/jobs-single/jobs-single.component";
import { AddWorkHistoryComponent } from "./components/back-end/add-work-history/add-work-history.component";
import { AddSkillComponent } from "./components/back-end/add-skill/add-skill.component";
import { AddEducationComponent } from "./components/back-end/add-education/add-education.component";
import { AuthGuard } from "./guard/auth.guard";
import { VerifyEmailComponent } from "./components/front-end/verify-email/verify-email.component";
import { ResetPasswordComponent } from "./components/front-end/reset-password/reset-password.component";
import { CategoryComponent } from "./components/front-end/category/category.component";
import { AddRefereesComponent } from "./components/back-end/add-referees/add-referees.component";
import { EditRefereesComponent } from "./components/back-end/edit-referees/edit-referees.component";

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
    path: "categories",
    component: CategoryComponent
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
    component: CompleteRegistrationComponent,
    canActivate: [AuthGuard]
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
    path: "user/email-verification",
    component: VerifyEmailComponent
  },
  {
    path: "user/password-reset",
    component: ResetPasswordComponent
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit-profile",
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "add-work-history",
    component: AddWorkHistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit-work-history/:id",
    component: EditWorkHistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "add-skill",
    component: AddSkillComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit-skill/:id",
    component: EditSkillsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "add-education",
    component: AddEducationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit-education/:id",
    component: EditEducationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "add-referees",
    component: AddRefereesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit-referees/:id",
    component: EditRefereesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
