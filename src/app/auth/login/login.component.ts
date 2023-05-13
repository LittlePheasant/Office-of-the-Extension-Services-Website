import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!:FormGroup;
  hide:boolean=true;

  constructor(
    public _fb:FormBuilder,
    private _api:ApiService
  ) { }

  ngOnInit(): void {

    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(form: any):void {
    const email = form.controls['email'].value;
    const password = form.controls['password'].value;
  
    const credentials = {
      email: email,
      password: password
    };
  
    this._api.toLogin(credentials).subscribe(
      (response: any) => {
        console.log(response);
        // Handle successful login
        if (response.status === 'success') {
          console.log('Login successful');
          console.log('User ID:', response.user_id);
          console.log('User Role:', response.role);
          // Redirect or perform any other actions
        } else {
          console.log('Login failed:', response.message);
          // Display error message to the user
        }
      },
      (err: any) => {
        console.log(err);
        // Handle HTTP error
      }
    );
  };
  


}
