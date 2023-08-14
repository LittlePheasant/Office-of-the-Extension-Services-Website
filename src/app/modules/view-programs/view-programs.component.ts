import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Data } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AddProgramComponent } from '../add-program/add-program.component';
import { EditProgramComponent } from '../edit-program/edit-program.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-programs',
  templateUrl: './view-programs.component.html',
  styleUrls: ['./view-programs.component.scss']
})
export class ViewProgramsComponent implements OnInit {

  programOptions: any[] = [];
  selectedProgramId!: string;
  filteredData: any[] = [];
  status!:string;
  userrole!:string;
  filterValue: string = '';


  columns = ['index', 'name', 'program', 'description', 'actions'];

  // Declare the data source
  data = new MatTableDataSource<Data>();

  // Declare the paginator and sort
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor( private _api: ApiService,
    private activateRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _dialog: MatDialog,){

  }
  

  ngAfterViewInit(): void {
    this.data.paginator = this.paginator;
    this.data.sort =this.sort
    
  }


  ngOnInit(): void {

    const userid = localStorage.getItem('userid');

    this._api.getPrograms(userid)
      .subscribe(
        (response: any) => {
          this.programOptions = response.data;

          this.data.data=response.data;

        },
        error => {
          this.showErrorMessage('Error retrieving program options.');
        }
      );
  }

  addProgramDialog(){

    const _dialogRef = this._dialog.open(AddProgramComponent);

    //console.log(_dialogRef);
    
  }

  editProgramDialog(programid:any){

    const userid = localStorage.getItem('userid');

    // Fetch the program details by ID 
    this._api.viewProgramInfo(userid, programid).subscribe((response: any) => {
      const _dialogRef = this._dialog.open(EditProgramComponent, {
        data: {
          programDetails: response.data
        }
      });
    });

  }

  delete(id:number){
    console.log(id);
     this._api.deleteProgram(id).subscribe((response:any) => {
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

  isAdmin(){
    return this.userrole === 'ADMIN';
    
  }

  applyFilter() {
    this.data.filter = this.filterValue.trim().toUpperCase();
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Try Again!', {
      duration: 50000,
      panelClass: ['error-snackbar']
    });
  }
}
