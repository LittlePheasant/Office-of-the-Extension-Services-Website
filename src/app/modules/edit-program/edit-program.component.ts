import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

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
              private datePipe: DatePipe,
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

        alert(response.message);
        this.dialogClose();
        window.location.reload();
        
      }, (error:any) => {
        alert(error.message);
      });

    } else {

      alert('Please check inputs!');
    }
  }

  dialogClose(){
    this._dialogRef.close();
  };

  

}
