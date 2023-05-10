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

  onLogin(form: FormGroup) {

    const formData = new FormData();

    const credentials = form.value;;
    formData.append('data', credentials);

    console.log(formData);

    // this._api.validateCredentials(credentials)
    //   .subscribe((response:any) => {
    //     console.log(response);
    //   })

    this._api.toLogin(credentials)
      .subscribe((response: any) => {
        console.log(response);
        this._api.userData= response.user_role;
        const user_role = this._api.userData;
        console.log(user_role);
      });
  }


}
