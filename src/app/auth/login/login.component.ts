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

    //console.log(credentials);

      this._api.toLogin(credentials)
    .subscribe((response: any) => {
      console.log(response);
      const data = response.data; // Assuming user_id and user_role are within a data object

      if (response.success === 1) {
        alert('Login successful');

        const userId = data.user_id;
        const role = data.user_role;
        this._api.userID = userId;//new
        this._api.userROLE = role;//new
        // console.log('User ID:', data.user_id);
        // console.log('User Role:', data.user_role);
        // Redirect or perform any other actions

        this.router.navigate(['/default/dashboard']);//new

        // if (role === 'Admin') {
        //   //this.router.navigate(['/admin-dashboard', userId]);
        //   this.router.navigate(['/main/dashboard']);
        // } else {
        //   //this.router.navigate(['/user-dashboard', userId]);
        //   console.log('user');
        // }


      } else {
        console.log('Login failed:', response.message);
        // Handle login error, such as displaying an error message to the user
      }
    }, (error: any) => {
      console.log(error);
      // Handle login error, such as displaying an error message to the user
    });
  };
  


}
