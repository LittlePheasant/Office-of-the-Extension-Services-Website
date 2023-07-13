import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-actual-report',
  templateUrl: './view-actual-report.component.html',
  styleUrls: ['./view-actual-report.component.scss']
})
export class ViewActualReportComponent implements OnInit {

  searchText:any;
  
  selectedOpt!:string;
  index = 0;
  transformedData: any[] = [];

  defaultValues: string[] =[];
  columns = ['particulars', 'quarter', 'CAAD', 'CAS', 'COBE', 'COE', 'COED', 'COT', 'GS' , 'BURAUEN', 'CARIGARA', 'DULAG', 'ORMOC', 'TANAUAN'];
  

  options = ['1', '2', '3', '4'];

  // Declare the data source
  data = new MatTableDataSource<any>();

  constructor(private _api:ApiService){}


  ngOnInit(): void {
    this.viewActualReport();
  }

  viewActualReport(){
    const userid = localStorage.getItem('userid');
    this._api.getParticulars(userid).subscribe(
    (response: any) => {

      this.transformData(response);
      this.data = new MatTableDataSource(this.transformedData);
      this.data.data = this.transformedData;
      console.log('responsedata',response);
      console.log('transformeddata', this.data.data);

      
    })
  }

  transformData(response: any) {
    this.transformedData = [];
  
    for (const particularsId in response) {
      if (response.hasOwnProperty(particularsId)) {
        const group = response[particularsId];
  
        let isFirstRow = true; // Flag to track the first row of each particularsId
  
        for (const quarter in group) {
          if (group.hasOwnProperty(quarter)) {
            const items = group[quarter];

            if (items.length > 0) {
              for (const item of items) {
                const transformedItem: any = {
                  particulars: isFirstRow ? item.particulars : '',
                  quarter: quarter,
                  CAAD: item.name === 'CAAD' ? item.count : '',
                  CAS: item.name === 'CAS' ? item.count : '',
                  COBE: item.name === 'COBE' ? item.count : '',
                  COE: item.name === 'COE' ? item.count : '',
                  COED: item.name === 'COED' ? item.count : '',
                  COT: item.name === 'COT' ? item.count : '',
                  GS: item.name === 'GS' ? item.count : '',
                  BURAUEN: item.name === 'BURAUEN' ? item.count : '',
                  CARIGARA: item.name === 'CARIGARA' ? item.count : '',
                  DULAG: item.name === 'DULAG' ? item.count : '',
                  ORMOC: item.name === 'ORMOC' ? item.count : '',
                  TANAUAN: item.name === 'TANAUAN' ? item.count : ''
                };

                this.transformedData.push(transformedItem);
                isFirstRow = false;
              }

            } else {

              const transformedItem: any = {
                particulars: isFirstRow ? group[Number(quarter) - 1]?.[0]?.particulars : '', // Set the value only for the first row
                quarter: quarter,
                CAAD: '',
                CAS: '',
                COBE: '',
                COE: '',
                COED: '',
                COT: '',
                GS: '',
                BURAUEN: '',
                CARIGARA: '',
                DULAG: '',
                ORMOC: '',
                TANAUAN: ''
              };

              this.transformedData.push(transformedItem);
              isFirstRow = false;
            }
            
          }
        }
      }
    }
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



