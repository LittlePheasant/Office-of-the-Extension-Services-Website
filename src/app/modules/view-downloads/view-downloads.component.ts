import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Data, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DownloadsComponent } from '../downloads/downloads.component';

@Component({
  selector: 'app-view-downloads',
  templateUrl: './view-downloads.component.html',
  styleUrls: ['./view-downloads.component.scss']
})
export class ViewDownloadsComponent implements OnInit {

  filteredData: any[] = [];
  userrole!:string;
  columns = ['index', '_filename', 'uploaded_at', 'actions'];

  // pdfFiles: string[] = [];
  // selectedPdf: string | null = null;

  // Declare the data source
  data = new MatTableDataSource<Data>();

  constructor( private _api: ApiService,
    private activateRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _dialog: MatDialog,){

  }

  ngOnInit(): void {
    const userid = localStorage.getItem('userid');
    this._api.viewUploadedFiles(userid)
    .subscribe(
      (response: any) => {
        //this._api.reportData = response;
        //console.log(response.data);
        
        this.filteredData=response.data;
        //console.log(this.filteredData);
        
        this.userrole = response.userRole;

        // this.pdfFiles = response.files; // Assuming 'files' is an array containing the file names
        // this.selectedPdf = this.pdfFiles.length > 0 ? this.pdfFiles[0] : null; // Select the first file by default

      }
    );
    this.viewUpload();
    this.isAdmin();
  }

  viewUpload(){
    
  };

  download(id:number){
    console.log(id);
    //  this._api.downloadFile(id).subscribe(data=>{
    //     this.data.data = this.data.data.filter((u: any) => u !== data);
    //     console.log(this.data);
    //  })

     //window.location.reload();
  }

  uploadFileDialog(){
    const userid = localStorage.getItem('userid');

    const _dialogRef = this._dialog.open(DownloadsComponent);

    console.log(_dialogRef);
    
  }

  isAdmin(){
    return this.userrole === 'ADMIN';
    
  }

  // showPdf(pdfName: string) {
  //   this.selectedPdf = pdfName;
  // }

}
