import { FirebaseService } from "./../pages/services/firebase.service";
import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements OnInit {
  signupForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(
    private authService: FirebaseService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private _snackBar: MatSnackBar
  ) {
    this.firebaseErrorMessage = "";
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      displayName: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    });
  }

  signup() {
    if (this.signupForm.invalid)
      // if there's an error in the form, don't submit it
      return;

    this.authService
      .signupUser(this.signupForm.value)
      .then((result) => {
        if (result == null) {
          this.router.navigate(["/login"]);
          this._snackBar.open("Regstration succesfull...", "ok", {
            duration: 3500,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["success-snackbar"],
          });
        } else if (result.isValid == false) {
          this._snackBar.open("Something went wrong !!!", "ok", {
            duration: 3500,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["danger-snackbar"],
          });
        }
      })
      .catch(() => {});
  }
}
