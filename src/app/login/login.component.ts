import { FirebaseService } from "./../pages/services/firebase.service";
import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
} from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(
    private authService: FirebaseService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    });

    this.firebaseErrorMessage = "";
  }

  ngOnInit(): void {}

  loginUser() {
    if (this.loginForm.invalid) return;

    this.authService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then((result) => {
        if (result == null) {
          // null is success, false means there was an error
          this.router.navigate(["provider-portal/dashboard"]);
          this._snackBar.open("logging in succesfull...", "ok", {
            duration: 3500,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["success-snackbar"],
          });
          // when the user is logged in, navigate them to dashboard
        } else if (result.isValid == false) {
          this._snackBar.open("Check your email or password", "ok", {
            duration: 3500,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["danger-snackbar"],
          });
        }
      });
  }
}
