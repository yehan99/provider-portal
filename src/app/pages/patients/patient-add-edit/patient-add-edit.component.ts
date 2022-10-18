import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { PatientServiceService } from "../../services/patient-service.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-patient-add-edit",
  templateUrl: "./patient-add-edit.component.html",
  styleUrls: ["./patient-add-edit.component.css"],
})
export class PatientAddEditComponent implements OnInit {
  title = "Add new Patient";
  urLink: string = "assets/images/users/user.png";
  patientForm: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private patientService: PatientServiceService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.isAddMode = !this.id;

    this.createForm();

    this.patientForm
      .get("country")
      .valueChanges.subscribe((country) =>
        console.log(
          'this.countryFormGroup.get("country").valueChanges',
          country
        )
      );
  }

  createForm() {
    this.patientForm = this.formBuilder.group({
      legacyID: ["", Validators.required],
      title: ["", Validators.required],
      userprofile: [""],
      surname: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: ["", Validators.required],
      DOB: ["", Validators.required],
      country: [""],
      careTeam: ["", Validators.required],
      superviseDr: ["", Validators.required],
      clinicGroup: ["", Validators.required],
      language: [""],
      countryCode: ["94", Validators.required],
      phone: ["", [Validators.maxLength(10), Validators.required]],
      Mobile: ["", Validators.maxLength(10)],
      Email: ["", [Validators.email, Validators.required]],
      Address: [""],
      State: [""],
      Country: [""],
    });
  }

  savePatient() {
    this.patientService
      .SavePatient(this.patientForm.value)
      .subscribe((result) => console.log(result));
    this._snackBar.open("Patient added succesfully!!", "ok", {
      duration: 3500,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: ["success-snackbar"],
    });
    this.router.navigate(["/patients"]);
  }

  selectProfilePicture(event) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.urLink = event.target.result;
      };
    }
  }
}
