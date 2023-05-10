import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { IndicatorsList } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-actual-report',
  templateUrl: './view-actual-report.component.html',
  styleUrls: ['./view-actual-report.component.scss']
})
export class ViewActualReportComponent {

  searchText:any;
  indicators!:IndicatorsList[];

  defaultValues: string[] =[];
  columns = ['particulars', 'CAAD', 'CAS', 'COBE', 'COE', 'COED', 'COT', 'GS',
             'BURAUEN', 'CARIGARA', 'DULAG', 'ORMOC', 'TANAUAN'];

  // Declare the data source
  data = new MatTableDataSource<Data>();

  constructor(private _api:ApiService){}



  viewActualReport(){
    this._api.getIndicators().subscribe(
    (response: any) => {
      this.indicators = response;
      console.log(this.indicators)
      this.data.data = response;
      // console.log(response);
    })
  }


}
