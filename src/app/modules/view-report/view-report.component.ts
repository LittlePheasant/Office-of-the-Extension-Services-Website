import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AddReportComponent } from '../add-report/add-report.component';
import { EditReportComponent } from '../edit-report/edit-report.component';
import { NgxPrintDirective } from 'ngx-print';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

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
  isProgramselected!:boolean;
  collegecampusName:any;
  progDesc:any;
  filteredData: any[] = [];
  entryStatusArray: any[] = [];
  status!:string;
  userrole!:string;
  fileName!: string;
  currentDate!:string;
  
  columns = ['index', 'name', 'date_entry', 'title', 'type_beneficiary', 'count_male', 'count_female', 'total',
             'poor_rate', 'fair_rate', 'satisfactory_rate', 'verysatisfactory_rate', 'excellent_rate',
             'duration', 'serviceOpt', 'partners', 'fac_staff', 'role', 'cost_fund', '_file', 'actions'];
             

  // Declare the data source
  data = new MatTableDataSource<Data>();


   // Declare the paginator and sort
   @ViewChild('paginator') paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   @ViewChild('printTable', { static: false }) printTable!: NgxPrintDirective;

  constructor( private _api: ApiService,
               private datePipe: DatePipe,
               private snackBar: MatSnackBar,
               private _dialog: MatDialog,){

    this.isProgramselected = true;
    
  }
  ngAfterViewInit(): void {
    this.data.paginator = this.paginator;
    this.data.sort =this.sort
    
  }
  ngOnInit(): void {

    if (this.isProgramselected) {
      this.viewReports();
    } else {
      this.onSelectProgram();
    }

    const userid = localStorage.getItem('userid');

    this._api.getPrograms(userid)
      .subscribe(
        (response: any) => {
          this.programOptions = response.data;
        },
        error => {
          this.showErrorMessage('Error retrieving program options.');
        }
      );

      this.currentDate = this.datePipe.transform(new Date(), 'MMMM dd, yyyy')!;

      //this.isLocked();
      this.isAdmin();

  }

  viewReports(){
    const userid = localStorage.getItem('userid');
    this._api.viewReport(userid)
    .subscribe(
      (response: any) => {
        this.filteredData=response.data;
     
        this.userrole = response.userRole;

        for (const item of this.filteredData) {
          const entryStatus = {
            entry_id: item.entry_id,
            status: item.status
          };
          this.entryStatusArray.push(entryStatus);
        }

        for (const status of this.filteredData) {
          this.status = status.status;
        }

      }
    );
  };

  onSelectProgram() {
    const userid = localStorage.getItem('userid');
    if (this.selectedProgramId === 'All') {
      this.viewReports();
      this.collegecampusName = '';
      this.progDesc = '';
    } else {
      this._api.viewReportByprogramID(userid, this.selectedProgramId)
      .subscribe((response:any) => {
       this.filteredData=response.data;
       for (const campus_name of this.filteredData) {
         this.collegecampusName = campus_name.campus_name;
       }
 
       for (const program_description of this.filteredData) {
         this.progDesc = program_description.description;
       }
 
      }, (error:any) => {
       console.log(error);
      })
    }

  }

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
     this._api.deleteReport(id).subscribe((response:any)=>{
      if(response.success  === 1){
        this.showSuccessMessage(response.message);
        window.location.reload();
      } else {
        this.showErrorMessage(response.message);
      }
        
     })

  }

  onPrint() {
    if (this.printTable) {
      this.printTable.print();
    }
  }

  addReportDialog(){
    const userid = localStorage.getItem('userid');

    const _dialogRef = this._dialog.open(AddReportComponent);

    //console.log(_dialogRef);
    
  }

  editOpenDialog(entry_id: any) {
    const userid = localStorage.getItem('userid');
  
    // Fetch the report details by ID using an API call or any other method
    this._api.fetchReportDetailsById(userid, entry_id).subscribe((response: any) => {
      const _dialogRef = this._dialog.open(EditReportComponent, {
        data: {
          reportDetails: response.data
        }
      });
  
      // console.log(_dialogRef);
      //console.log(response);
    });
    
  };

  isLocked(id:string){
    const entry = this.entryStatusArray.find(item => item.entry_id === id);
    return entry ? entry.status === 'LOCKED' : false;
  }

  lock(entry_id:any){
    const statusUpdate = 'LOCKED';

    const formData = new FormData();

    formData.append('status' , statusUpdate);

    this._api.updateStatus(entry_id, formData)
     .subscribe((response: any) => {
      this.showSuccessMessage('Please confirm to lock.');
        if(response.success  === 1){
          this.showSuccessMessage(response.message);
          window.location.reload();
        } else {
          this.showErrorMessage(response.message);
        }
    })
  };

  unlock(entry_id:any){
    const statusUpdate = '';

    const formData = new FormData();

    formData.append('status' , statusUpdate);

    this._api.updateStatus(entry_id, formData)
     .subscribe((response: any) => {
      this.showSuccessMessage('Please confirm to unlock.');
        if(response.success  === 1){
          this.showSuccessMessage(response.message);
          window.location.reload();
        } else {
          this.showErrorMessage(response.message);
        }
    })
  }

  isAdmin(){
    return this.userrole === 'ADMIN';
    
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

  
}
