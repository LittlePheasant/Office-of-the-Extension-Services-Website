import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { IndicatorsList } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-actual-report',
  templateUrl: './view-actual-report.component.html',
  styleUrls: ['./view-actual-report.component.scss']
})
export class ViewActualReportComponent implements OnInit {

  searchText:any;
  indicators!:IndicatorsList[];
  selectedOpt!:string;

  defaultValues: string[] =[];
  columns = ['particulars', 'CAAD', 'CAS', 'COBE', 'COE', 'COED', 'COT', 'GS',
             'BURAUEN', 'CARIGARA', 'DULAG', 'ORMOC', 'TANAUAN'];

  options = ['1', '2', '3', '4'];

  // Declare the data source
  data = new MatTableDataSource<Data>();

  constructor(private _api:ApiService){}


  ngOnInit(): void {
  }

  viewActualReport(){
    // this._api.getIndicators().subscribe(
    // (response: any) => {
    //   this.indicators = response;
    //   console.log(this.indicators)
    //   this.data.data = response;
    //   // console.log(response);
    // })
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
