import { PatientServiceService } from "./../services/patient-service.service";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { TableUtil } from "src/tableUtil";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.css"],
})
export class PatientsComponent implements OnInit {
  columnsToDisplay: string[] = [
    "ID",
    "Name",
    "DOB",
    "Email",
    "Mobile",
    "Address",
    "Clinic Group",
    "Date",
    "Supervising Doctor",
    "Action",
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, "expand"];
  patientData: any[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  IDControl: FormControl = new FormControl();
  patientName: FormControl = new FormControl();
  MatSort: MatSort;
  isAdvanceSearchEnable: boolean;
  title = "Patient dashboard";

  constructor(
    private patientService: PatientServiceService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllPatientList();
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllPatientList() {
    this.patientService.PatientDetails().subscribe((data) => {
      this.dataSource.data = data;
      this.patientData = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addNew() {
    this.route.navigate(["add-new"]);
  }

  deletePatient(patientID: any) {
    this.patientService.DeletePatient(patientID).subscribe((result) => {
      if (result) {
        this._snackBar.open("Patient Delete succesfully!!", "ok", {
          duration: 3500,
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: ["success-snackbar"],
        });
        this.getAllPatientList();
      } else {
        this._snackBar.open("Unable to delete patient!!", "ok", {
          duration: 3500,
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: ["danger-snackbar"],
        });
      }
    });
  }

  exportExcel() {
    TableUtil.exportTableToExcel("ExampleMaterialTable", "Patients list");
  }
}
