import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackBar: MatSnackBar,
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
        campus_name: [response.data[0].campus_name],
        name: [response.data[0].name],
        username: [response.data[0].username],
        user_email: [response.data[0].user_email],
        password: [response.data[0].user_password],
        cpassword: [response.data[0].user_password],
        file: [response.data[0].imagename]
      }, {validators: this.MustMatch('password', 'cpassword')})

      this.userrole = response.data[0].user_role;
      const filename = response.data[0].imagename.split('/');
      this.fileFetched = filename[filename.length - 1];

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

        if(response.success  === 1){
          this.showSuccessMessage(response.message);
          window.location.reload();
        } else {
          this.showErrorMessage(response.message);
        }
        
      });

    } else {
      this.showErrorMessage('Please check inputs!');
    }
  }

  isAdmin(){
    return this.userrole === 'ADMIN';
    
  }

  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 50000,
      panelClass: ['top-snackbar'],
      
    });
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Try Again!', {
      duration: 50000,
      panelClass: ['top-snackbar']
    });
  }


}
