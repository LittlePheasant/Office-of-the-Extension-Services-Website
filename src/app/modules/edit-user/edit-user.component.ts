import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit{


  editUserForm!:FormGroup;
  dataLoaded: boolean=false;
  hidePassword:boolean = true;
  hideCPassword:boolean = true;
  fileFetched:any;
  fileDetails!:File;

  constructor (private _fb: FormBuilder,
    private _api: ApiService,
    private snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<EditUserComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any){

    this.editUserForm = this._fb.group({
      user_id: [data.userDetails[0].user_id],
      campus_name: [data.userDetails[0].campus_name],
      name: [data.userDetails[0].name],
      username: [data.userDetails[0].username],
      user_email: [data.userDetails[0].user_email],
      password: [data.userDetails[0].user_password],
      cpassword: [data.userDetails[0].user_password],
      file: [data.userDetails[0].imagename]
    });

    this.dataLoaded = true;
    const filename = data.userDetails[0].imagename.split('/');
    this.fileFetched = filename[filename.length - 1];
   }


  ngOnInit(): void {
    
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.fileFetched = file.name;
    this.fileDetails = file;
  }


  postdata(){

    const id = this.data.userDetails[0].user_id;
    const data = this.editUserForm.value;

    const formData = new FormData();

    formData.append('campus_name', data.campus_name);
    formData.append('name', data.name);
    formData.append('username', data.username);
    formData.append('user_email', data.user_email);
    formData.append('password', data.password);

    if (this.fileDetails) {
      formData.append('file', this.fileDetails);
      console.log('formData1', formData.get('file'));
    } else {
      formData.append('file', this.fileFetched);
      console.log('formData2', formData.get('file'));
    }

    if (this.editUserForm.valid){

      this._api.updateUserInfo(id, formData).subscribe((response:any) => {

        if(response.success  === 1){
          const confirmSnackBarRef = this.snackBar.open('Please confirm to continue', 'Confirm', {
            panelClass: ['confirm-snackbar'],
          });
          confirmSnackBarRef.afterDismissed().subscribe(() => {
            const snackBarRef = this.snackBar.open(response.message, 'Okay', {
              panelClass: ['success-snackbar'],
            });
            snackBarRef.afterDismissed().subscribe(() => {
              this.dialogClose();
              window.location.reload();
            });
          });
          
        } else {
          this.showErrorMessage(response.message);
        }
      
      });

    } else {
      this.showErrorMessage('Please check inputs!');
    }

    

  }

  dialogClose(){
    this._dialogRef.close();
  };

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Try Again!', {
      duration: 50000,
      panelClass: ['error-snackbar']
    });
  }

  get campus_name() { 
    return this.editUserForm.get('campus_name');
  }

  get name() { 
    return this.editUserForm.get('name');
  }

  get username() { 
    return this.editUserForm.get('username');
  }

  get user_email() { 
    return this.editUserForm.get('user_email');
  }

  get user_password() { 
    return this.editUserForm.get('user_password');
  }

  get file() { 
    return this.editUserForm.get('file');
  }

}
