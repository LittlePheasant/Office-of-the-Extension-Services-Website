import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  editProfileForm!:FormGroup;
  hidePassword:boolean = true;
  hideCPassword:boolean = true;
  userrole!:string;
  fileFetched:any;
  fileDetails!:File;

  constructor(private _api: ApiService,
    private _fb: FormBuilder,){
      this.editProfileForm = this._fb.group({
        campus_name: ['', [Validators.required]],
        name: ['', [Validators.required]],
        username: ['', [Validators.required]],
        user_email: ['', [Validators.required]],
        password: ['', [Validators.required,  Validators.minLength(8)]],
        cpassword: ['', [Validators.required]],
        file: ['']
      }, {validators: this.MustMatch('password', 'cpassword')}
      )
    }

  ngOnInit(): void {

    const userid = localStorage.getItem('userid');
    this._api.getUsers(userid).subscribe((response:any) => {

      this.editProfileForm = this._fb.group({
        campus_name: [response.campus_name],
        name: [response.data.name],
        username: [response.data.username],
        user_email: [response.data.user_email],
        password: [response.data.user_password],
        cpassword: [response.data.user_password],
        file: [response.data.imagename]
      }, {validators: this.MustMatch('password', 'cpassword')})

      this.userrole = response.data.user_role;
      this.fileFetched = response.data.imagename;
      console.log(response.data)

    });

    

    
    
  }

  MustMatch(controlName: string, matchingcontrolName: string) {
    return(addUserForm:FormGroup) => {
      const control = addUserForm.controls[controlName];
      const matchingControl = addUserForm.controls[matchingcontrolName];

      if(matchingControl.errors && !matchingControl.errors['MustMatch']){
        
        //returns if another validator has already found an error on the matchingControl
        return;
      }

      //set error on matchingControl if validation fails
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({MustMatch:true});
      }else{
        matchingControl.setErrors(null);
      }

      // Return null when validation passes
    return null;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.fileFetched = file.name;
    this.fileDetails = file;
    console.log(this.fileDetails);
  }

  postdata(){
    const userid = localStorage.getItem('userid');
    const data = this.editProfileForm.value;

    const formData = new FormData();

    formData.set('campus_name', data.campus_name);
    formData.set('name', data.name);
    formData.set('username', data.username);
    formData.set('user_email', data.user_email);
    formData.set('password', data.password);

    if (this.editProfileForm.valid){

      this._api.updateUserInfo(userid, formData).subscribe((response:any) => {

        alert(response.message);
        window.location.reload();
        
      }, (error:any) => {
        alert(error.message);
      });

    } else {

      alert('Please check inputs!');
    }
  }

  isAdmin(){
    return this.userrole === 'ADMIN';
    
  }


}
