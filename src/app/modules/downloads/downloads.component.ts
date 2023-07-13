import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { error } from 'highcharts';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {


  file:any;
  user_id:any;

  constructor (
    private _api: ApiService,
    private _dialogRef: MatDialogRef<DownloadsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  
  
  ngOnInit(): void {
    const userid = localStorage.getItem('userid');
    if (typeof userid === 'string') {
      this.user_id = parseInt(userid, 10);
    } else {
      // Handle the case when userid is null or not a string
      // For example, show an error message or set a default user ID
      console.log('null');
    }
  }

  getfile(event:any){
    this.file = event.target.files[0];
    console.log(this.file);
  }

  upload() {
    
    let formData = new FormData();
    formData.set('user_id', this.user_id);
    formData.set('file',this.file);

    this._api.uploadFile(formData).subscribe((response:any) => {
      console.log(response);
      if (response.success === 1){
        alert ('Uploaded Successfully!');
        this.dialogClose();
        window.location.reload();
      }
    }, (error:any) => {
      console.log(error);
    })
  }

  dialogClose(){
    this._dialogRef.close();
  };

}
