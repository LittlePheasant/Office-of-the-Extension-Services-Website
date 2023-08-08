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


  columns = ['index', 'name', 'program', 'description', 'actions'];

  // Declare the data source
  data = new MatTableDataSource<Data>();

  // Declare the paginator and sort
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor( private _api: ApiService,
    private activateRoute: ActivatedRoute,
    private _fb: FormBuilder,
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

          this.filteredData=response.data;

        },
        error => {
          console.log('Error retrieving program options.');
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
      if(response.success === 1) {
        alert(response.message);
      } else {
        alert(response.message);
      }
      window.location.reload();
     })

     
  }

  isAdmin(){
    return this.userrole === 'Admin';
    
  }
}
