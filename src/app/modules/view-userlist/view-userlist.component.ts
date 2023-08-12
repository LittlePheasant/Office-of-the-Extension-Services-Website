import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-userlist',
  templateUrl: './view-userlist.component.html',
  styleUrls: ['./view-userlist.component.scss']
})
export class ViewUserlistComponent {

  searchText: any;
  imagePath: string | null = null;
  columns = ['index', 'imagename', 'campus_name', 'name', 'username', 'user_email', 'user_role', 'actions'];

  // Declare the data source
  data = new MatTableDataSource<Data>();

  // Declare the paginator and sort
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _api: ApiService,
              private _dialog: MatDialog,
              private snackBar: MatSnackBar,
              private sanitizer: DomSanitizer){}


  ngOnInit(): void {
    const userid = localStorage.getItem('userid');
    this.viewUsers(userid);
  }

  ngAfterViewInit(): void {
    this.data.paginator = this.paginator;
    this.data.sort =this.sort
    
  }

  viewUsers(userid:any){
    
    this._api.viewUsersList()
    .subscribe(
      (response: any) => {
        // this._api.userData = response.data;
        
        this.data.data = response.data;
        this.data.data.forEach((user: any) => {
          user.imagename = this._api.baseUrl + '/' + user.imagename;
        });
        
        
      }
    );
  };

  addUserDialog(){
    const userid = localStorage.getItem('userid');

    const _dialogRef = this._dialog.open(AddUserComponent);

    console.log(_dialogRef);
    
  }

  editUserDialog(user_id:any){
    this._api.getUsers(user_id).subscribe((response:any) => {
      const _dialogRef = this._dialog.open(EditUserComponent, {
        data: {
          userDetails: response.data
        }
      });
  
      console.log(_dialogRef);
      console.log(response)
    })
  };

  delete(id:number){
     this._api.deleteReport(id).subscribe((response:any)=>{
        //this.data.data = this.data.data.filter((u: any) => u !== data);
        if(response.success  === 1){
          const confirmSnackBarRef = this.snackBar.open('Please confirm to delete', 'Confirm', {
            panelClass: ['confirm-snackbar'],
            duration: 0, // Set duration to 0 so the snackbar stays open
          });

          confirmSnackBarRef.afterDismissed().subscribe(() => {
            const snackBarRef = this.snackBar.open(response.message, 'Okay', {
              panelClass: ['success-snackbar'],
            });
            snackBarRef.afterDismissed().subscribe(() => {
              window.location.reload();
            });
          });
      } else {
        this.showErrorMessage(response.message);
      }
     })
  }


  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Try Again!', {
      duration: 50000,
      panelClass: ['error-snackbar']
    });
  }

}
