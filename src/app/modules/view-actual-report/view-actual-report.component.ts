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

      let count: any[] = [];
      count = response.fetchdata;
      console.log(count);
      // Map or transform the fetched data to match the Data structure
      const rows: Data[] = this.transformData(count);

    console.log(rows)
      
      // Assign the transformed data to the MatTableDataSource
      this.data.data = rows;
      
    })
  }

  transformData(count: ReportCount[]): Data[] {
    const rows: Data[] = [];

    // Iterate over the count array and transform each entry
    count.forEach((entry: ReportCount) => {
      const row: Data = {
        Particulars: entry.particulars,
        CAAD: this.getElementCount(entry, 'CAAD'),
        CAS: this.getElementCount(entry, 'CAS'),
        COBE: this.getElementCount(entry, 'COBE'),
        COE: this.getElementCount(entry, 'COE'),
        COED: this.getElementCount(entry, 'COED'),
        COT: this.getElementCount(entry, 'COT'),
        GS: this.getElementCount(entry, 'GS'),
        BURAUEN: this.getElementCount(entry, 'BURAUEN'),
        CARIGARA: this.getElementCount(entry, 'CARIGARA'),
        DULAG: this.getElementCount(entry, 'DULAG'),
        ORMOC: this.getElementCount(entry, 'ORMOC'),
        TANAUAN: this.getElementCount(entry, 'TANAUAN')
      };
      rows.push(row);
    });

    return rows;
  }


  getElementCount(entry: any, column: string): string {
    const matchingData = entry[column] as { name: string, count: string }[];
    if (Array.isArray(matchingData)) {
      const matchingEntry = matchingData.find(item => item.name === column);
      return matchingEntry ? matchingEntry.count : '';
    }
    console.log(matchingData)
    return '';

    
  }
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



