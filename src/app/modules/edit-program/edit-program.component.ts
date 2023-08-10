import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.scss']
})
export class EditProgramComponent implements OnInit{

  editProgramForm!: FormGroup;
  userOptions: any[] = [];

  constructor (private _fb: FormBuilder,
              private _api: ApiService,
              private snackBar: MatSnackBar,
              private _dialogRef: MatDialogRef<EditProgramComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any){


    this.editProgramForm = this._fb.group({
      name: [data.programDetails.name],
      prog_name:[data.programDetails.program],
      prog_desc: [data.programDetails.description]
    })
  }


  ngOnInit(): void {
    
  }

  postdata() {
    const id = this.data.programDetails.user_id;
    const data = this.editProgramForm.value;

    if (this.editProgramForm.valid){

      this._api.updateProgramInfo(id, data).subscribe((response:any) => {

        if(response.success  === 1){
          this.showSuccessMessage(response.message);
          this.dialogClose();
          window.location.reload();
        } else {
          this.showErrorMessage(response.message);
        }
      });

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
