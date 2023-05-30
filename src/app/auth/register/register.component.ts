import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm!:FormGroup;
  hide:boolean=true;
  email:any;
  password:any;
  cpassword:any;

  constructor(
    public _fb:FormBuilder,
    private _api:ApiService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.registerForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegister(form: any){
      this.email = form.controls['email'].value,
      this.password = form.controls['password'].value,
      this.cpassword = form.controls['cpassword'].value

    

  }

}
