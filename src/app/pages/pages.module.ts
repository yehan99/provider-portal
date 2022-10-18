import { ToolbarComponent } from "./toolbar/toolbar.component";
import { CdkTableModule } from "@angular/cdk/table";
import { CommonModule } from "@angular/common";
import { BrowserModule, Title } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DemoMaterialModule } from "../demo-material-module";
import { PatientsComponent } from "./patients/patients.component";
import { PathologyComponent } from "./pathology/pathology.component";
import { TreatmentPlanComponent } from "./treatment-plan/treatment-plan.component";
import { RouterModule } from "@angular/router";
import { PagesRoutes } from "./pages.routing";
import { PatientAddEditComponent } from "./patients/patient-add-edit/patient-add-edit.component";
import { MatSelectCountryModule } from "@angular-material-extensions/select-country";

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    MatSelectCountryModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    RouterModule.forChild(PagesRoutes),
  ],
  providers: [],
  entryComponents: [],
  declarations: [
    PatientsComponent,
    PathologyComponent,
    TreatmentPlanComponent,
    ToolbarComponent,
    PatientAddEditComponent,
  ],
})
export class PagesModule {}
