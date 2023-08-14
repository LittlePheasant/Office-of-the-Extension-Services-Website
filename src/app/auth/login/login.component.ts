import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!:FormGroup;
  hide:boolean=true;
  email:any;
  password:any;

  constructor(
    public _fb:FormBuilder,
    private _api:ApiService,
    private snackBar: MatSnackBar,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onLogin(form: any){
    const credentials = {
      email: form.controls['email'].value,
      password: form.controls['password'].value
    }

      this._api.toLogin(credentials)
    .subscribe((response: any) => {
      const data = response.data; // Assuming user_id and user_role are within a data object
      
      if(data){
        const snackBarRef = this.snackBar.open('Login Success!', 'Okay', {
          panelClass: ['success-snackbar'],
        });

        snackBarRef.afterDismissed().subscribe(() => {
          const userId = data.user_id;
          const role = data.user_role;
          localStorage.setItem('userid', userId);
          this._api.userROLE = role;//new

          // Redirect or perform any other actions
          this.router.navigate(['/main/dashboard']);
        });
        

      } else {
        this.showErrorMessage(response.message);
      }
    });
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Try Again!', {
      duration: 50000,
      panelClass: ['error-snackbar']
    });
  }
  


}
