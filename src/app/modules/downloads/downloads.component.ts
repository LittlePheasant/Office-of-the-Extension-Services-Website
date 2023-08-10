import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { error } from 'highcharts';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {


  file:any;
  user_id:any;
  uploadFileForm!:FormGroup;

  constructor (
    private _fb: FormBuilder,
    private _api: ApiService,
    private snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<DownloadsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  
  
  ngOnInit(): void {

    this.user_id = localStorage.getItem('userid');

    this.uploadFileForm = this._fb.group({
      userid: [this.user_id],
      file:['']
    })

  }

  onFileSelected(event:any){
    this.file = event.target.files[0];
    console.log(this.file);
  }

  postdata() {
    let formData = new FormData();
    formData.append('user_id', this.user_id);
    formData.append('file',this.file);

    this._api.uploadFile(formData).subscribe((response:any) => {
      if(response.success  === 1){
        this.showSuccessMessage(response.message);
        this.dialogClose();
        window.location.reload();
      } else {
        this.showErrorMessage(response.message);
      }
    })
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
