import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit{

  addUserForm!:FormGroup;
  hidePassword:boolean = true;
  hideCPassword:boolean = true;
  selectedImage: any;

  constructor (private _fb: FormBuilder,
    private _api: ApiService,
    private snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<AddUserComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any){
   }

  ngOnInit(): void {

    this.addUserForm = this._fb.group({
      user_id: ['', [Validators.required]],
      campus_name: ['', Validators.required],
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      user_email: ['', [Validators.required]],
      password: ['', [Validators.required,  Validators.minLength(8)]],
      cpassword: ['', [Validators.required]],
      user_role: ['', Validators.required],
      file: ['']
    }, {validators: this.MustMatch('password', 'cpassword')}
    )
    
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
    this.selectedImage = file;
  }

  postdata() {

    const formData = new FormData();

    formData.append('capus_name', this.addUserForm.get('capus_name')?.value);
    formData.append('name', this.addUserForm.get('name')?.value);
    formData.append('username', this.addUserForm.get('username')?.value);
    formData.append('user_email', this.addUserForm.get('user_email')?.value);
    formData.append('password', this.addUserForm.get('password')?.value);
    formData.append('user_role', this.addUserForm.get('user_role')?.value);
    formData.append('file', this.selectedImage);

    if (this.addUserForm.valid) {

      this._api.addUser(formData).subscribe((response:any) => {
        
        if(response.success  === 1){
          this.showSuccessMessage(response.message);
          this.dialogClose();
          window.location.reload();
        } else {
          this.showErrorMessage(response.message);
        }
        
      })

    } else {
      this.showErrorMessage('Please check inputs!');
    }
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

  dialogClose(){
    this._dialogRef.close();
  };

}
