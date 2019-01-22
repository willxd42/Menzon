import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile/profile.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { SharedModule } from "src/app/shared/shared.module";
import { EditEducationComponent } from "./edit-education/edit-education.component";
import { EditSkillsComponent } from "./edit-skills/edit-skills.component";
import { EditWorkHistoryComponent } from "./edit-work-history/edit-work-history.component";
import { UiModule } from "../ui/ui.module";
import { AddSkillComponent } from './add-skill/add-skill.component';
import { AddEducationComponent } from './add-education/add-education.component';
import { AddWorkHistoryComponent } from './add-work-history/add-work-history.component';
import { AddRefereesComponent } from './add-referees/add-referees.component';
import { EditRefereesComponent } from './edit-referees/edit-referees.component';
import { AddLanguageComponent } from './add-language/add-language.component';
import { EditLanguageComponent } from './edit-language/edit-language.component';

@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    EditEducationComponent,
    EditSkillsComponent,
    EditWorkHistoryComponent,
    AddSkillComponent,
    AddEducationComponent,
    AddWorkHistoryComponent,
    AddRefereesComponent,
    EditRefereesComponent,
    AddLanguageComponent,
    EditLanguageComponent
  ],
  imports: [CommonModule, SharedModule, UiModule]
})
export class BackEndModule {}
