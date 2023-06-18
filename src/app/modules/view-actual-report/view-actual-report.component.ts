import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Data, ReportCount } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-actual-report',
  templateUrl: './view-actual-report.component.html',
  styleUrls: ['./view-actual-report.component.scss']
})
export class ViewActualReportComponent implements OnInit {

  searchText:any;
  count!:ReportCount[];
  selectedOpt!:string;

  defaultValues: string[] =[];
  columns = ['Particulars', 'CAAD', 'CAS', 'COBE', 'COE', 'COED', 'COT', 'GS',
             'BURAUEN', 'CARIGARA', 'DULAG', 'ORMOC', 'TANAUAN'];

  options = ['1', '2', '3', '4'];

  // Declare the data source
  data = new MatTableDataSource<Data>();

  constructor(private _api:ApiService){}


  ngOnInit(): void {
    this.viewActualReport();
  }

  viewActualReport(){
    const userid = localStorage.getItem('userid');
    this._api.getParticulars(userid).subscribe(
    (response: any) => {
      this.count = response;
      console.log(this.count);
      // Map or transform the fetched data to match the Data structure
      const rows = this.count;

      // Convert the associative array to a flat array
      const flattenedRows = Object.values(rows);

      console.log(flattenedRows);
    })
  }

  getElementCount(element: any, column: string): string {
    const matchingData = element[column] as { name: string, count: string }[];
    if (Array.isArray(matchingData)) {
      const matchingEntry = matchingData.find(entry => entry.name === column);
      return matchingEntry ? matchingEntry.count : '';
    }
    return '';
  }
  
  



  // search(){
  //   console.log(this.selectedOpt);
  //   this._api.getDataByParticularId(this.selectedOpt).subscribe(
  //     (response: any) => {
  //       this.indicators = response;
  //       console.log(this.indicators)
  //       this.data.data = response;
  //       // console.log(response);
  //     })
  //}


}
