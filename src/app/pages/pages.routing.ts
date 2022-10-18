import { PatientAddEditComponent } from "./patients/patient-add-edit/patient-add-edit.component";
import { TreatmentPlanComponent } from "./treatment-plan/treatment-plan.component";
import { PathologyComponent } from "./pathology/pathology.component";
import { PatientsComponent } from "./patients/patients.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

export const PagesRoutes: Routes = [
  {
    path: "patients",
    component: PatientsComponent,
    // children: [
    //   {
    //     path: "edit",
    //     component: PatientAddEditComponent,
    //     outlet: "static-outlet",
    //   },
    // ],
  },
  {
    path: "add-new",
    component: PatientAddEditComponent,
  },
  {
    path: "patient-edit/:id",
    component: PatientAddEditComponent,
  },
  {
    path: "pathology",
    component: PathologyComponent,
  },
  {
    path: "treatment-plan",
    component: TreatmentPlanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(PagesRoutes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
