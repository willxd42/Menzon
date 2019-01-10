import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile/profile.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ManageWorkHistoryComponent } from "./manage-work-history/manage-work-history.component";
import { ManageSkillsComponent } from "./manage-skills/manage-skills.component";
import { ManageEducationComponent } from "./manage-education/manage-education.component";
import { EditEducationComponent } from "./edit-education/edit-education.component";
import { EditSkillsComponent } from "./edit-skills/edit-skills.component";
import { EditWorkHistoryComponent } from "./edit-work-history/edit-work-history.component";
import { UiModule } from "../ui/ui.module";

@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    ManageWorkHistoryComponent,
    ManageSkillsComponent,
    ManageEducationComponent,
    EditEducationComponent,
    EditSkillsComponent,
    EditWorkHistoryComponent
  ],
  imports: [CommonModule, SharedModule, UiModule]
})
export class BackEndModule {}
