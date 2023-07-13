import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Data } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ReportData } from 'src/app/models/models';
import { AddReportComponent } from '../add-report/add-report.component';
import { EditReportComponent } from '../edit-report/edit-report.component';
//import { NgxPrintService } from 'ngx-print';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent {

  searchText:any;
  filePath!: string;
  userid!: string;
  id:any;
  programOptions: any[] = [];
  selectedProgramId!: string;
  filteredData: any[] = [];
  status!:string;
  userrole!:string;
  fileName!: string;
  
  columns = ['index', 'date_entry', 'title', 'type_beneficiary', 'count_male', 'count_female', 'total',
             'poor_rate', 'fair_rate', 'satisfactory_rate', 'verysatisfactory_rate', 'excellent_rate',
             'duration', 'serviceOpt', 'partners', 'fac_staff', 'role', 'cost_fund', '_file', 'actions'];
             

  // Declare the data source
  data = new MatTableDataSource<Data>();


   // Declare the paginator and sort
   @ViewChild('paginator') paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   //directives!: [NgxPrintDirective]

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

    this.adminview();

    const userid = localStorage.getItem('userid');

    this._api.getPrograms(userid)
      .subscribe(
        (response: any) => {
          this.programOptions = response;
          //console.log(this.programOptions);

        },
        error => {
          console.log('Error retrieving program options.');
        }
      );

      //this.islocked();
      this.isAdmin();

  }

  adminview(){
    const userid = localStorage.getItem('userid');
    this._api.viewReport(userid)
    .subscribe(
      (response: any) => {
        //this._api.reportData = response;
        //console.log(response.data);
        
        this.filteredData=response.data;
        //console.log(this.filteredData);
        
        this.userrole = response.userRole;

      }
    );
  };

  // islocked(){
  //   return this.status === 'LOCKED';
  // }

  applyFilter(): void {
    if (this.selectedProgramId) {
      this.filteredData = this.data.data.filter((element: any) => element.program_id === this.selectedProgramId);
    } else {
      this.filteredData = this.data.data;
    }
  };

  filterData(): void {
    this.applyFilter();
    this.paginator.firstPage();
  }

  delete(id:number){
    console.log(id);
     this._api.deleteReport(id).subscribe(data=>{
        this.data.data = this.data.data.filter((u: any) => u !== data);
        console.log(this.data);
     })

     window.location.reload();
  }

  print(id:any) {
    // Call the print method
    //this.printService.print();
    const printSectionId = id;
    this.print(printSectionId);
  }

  addReportDialog(){
    const userid = localStorage.getItem('userid');

    const _dialogRef = this._dialog.open(AddReportComponent);

    console.log(_dialogRef);
    
  }

  editOpenDialog(entry_id: any) {
    const userid = localStorage.getItem('userid');
  
    // Fetch the report details by ID using an API call or any other method
    // Assuming you have a method to fetch report details, replace 'fetchReportDetailsById' with the appropriate method
    this._api.fetchReportDetailsById(userid, entry_id).subscribe((response: any) => {
      const _dialogRef = this._dialog.open(EditReportComponent, {
        data: {
          reportDetails: response.data
        }
      });
  
      console.log(_dialogRef);
      console.log(response)
    });
    
  };

  isLocked(){

  }

  lock(entry_id:any){
    const userid = localStorage.getItem('userid');
    this.status = "LOCKED";
    const statusUpdate = this.status;
    this._api.updateStatus(entry_id, statusUpdate)
     .subscribe((response: any) => {
        console.log(response);
    })
  };

  isAdmin(){
    return this.userrole === 'Admin';
    
  }

  
}
