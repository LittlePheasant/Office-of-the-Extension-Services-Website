import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

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
    private router:Router
  ) { }

  ngOnInit(): void {

    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(form: any){
    const credentials = {
      email: form.controls['email'].value,
      password: form.controls['password'].value
    }

      this._api.toLogin(credentials)
    .subscribe((response: any) => {
      console.log(response);
      // const data = response.data; // Assuming user_id and user_role are within a data object

      // if (response.success === 1) {
      //   alert('Login successful');

      //   const userId = data.user_id;
      //   const role = data.user_role;
      //   localStorage.setItem('userid', userId); // Replace '123' with the actual value of the userid obtained from your API
      //   this._api.userROLE = role;//new

      //   // Redirect or perform any other actions

      //   this.router.navigate(['/main/dashboard']);//new


      // } else {
      //   console.log('Login failed:', response.message);
      //   // Handle login error, such as displaying an error message to the user
      // }
    });

    console.log(credentials);
  }
  


}
