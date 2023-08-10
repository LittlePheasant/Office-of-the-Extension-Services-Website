import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss']
})
export class AddProgramComponent implements OnInit {

  addProgramForm!: FormGroup;
  userOptions: any[] = [];

  constructor (private _fb: FormBuilder,
              private _api: ApiService,
              private snackBar: MatSnackBar,
              private _dialogRef: MatDialogRef<AddProgramComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any){
            }

  ngOnInit(): void {

    const userid = localStorage.getItem('userid');

    this.addProgramForm = this._fb.group({
      user_id: ['', [Validators.required]],
      prog_name: ['', [Validators.required]],
      prog_desc: ['', [Validators.required]]
    });

    this._api.getUsers(userid)
    .subscribe(
      (response:any) => {
        this.userOptions = response.name;
      }
    )
  }

  postdata() {
    const data = this.addProgramForm?.value;

    const formData = new FormData();

    formData.append('user_id', data.user_id);
    formData.append('prog_name', data.prog_name);
    formData.append('prog_desc', data.prog_desc);

    this._api.addProgram(formData).subscribe((response:any) => {
      if (this.addProgramForm.valid) {
        if(response.success  === 1){
          this.showSuccessMessage(response.message);
          this.dialogClose();
          window.location.reload();
        } else {
          this.showErrorMessage(response.message);
        }
      } else {
        this.showErrorMessage('Invalid input \n Please check input again!');
      }
    })
  }

  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 50000,
      panelClass: ['top-snackbar'],
      
    });
    this.dialogClose();
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

  get user_id() { 
    return this.addProgramForm.get('user_id');
  }

  get prog_name() { 
    return this.addProgramForm.get('prog_name');
  }

  get prog_desc() { 
    return this.addProgramForm.get('prog_desc');
  }

}
