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
  rowspan!:number; // Initialize rowspan for each particulars group

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
              this.rowspan = items.length;
              const transformedItem: any = {
                particulars: isFirstRow ? items?.[0]?.particulars : '',
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
  
              for (const item of items) {
                if (item.name === 'CAAD') {
                  transformedItem.CAAD = item.count;
                } else if (item.name === 'CAS') {
                  transformedItem.CAS = item.count;
                } else if (item.name === 'COBE') {
                  transformedItem.COBE = item.count;
                } else if (item.name === 'COE') {
                  transformedItem.COE = item.count;
                } else if (item.name === 'COED') {
                  transformedItem.COED = item.count;
                } else if (item.name === 'COT') {
                  transformedItem.COT = item.count;
                } else if (item.name === 'GS') {
                  transformedItem.GS = item.count;
                } else if (item.name === 'BURAUEN') {
                  transformedItem.BURAUEN = item.count;
                } else if (item.name === 'CARIGARA') {
                  transformedItem.CARIGARA = item.count;
                } else if (item.name === 'DULAG') {
                  transformedItem.DULAG = item.count;
                } else if (item.name === 'ORMOC') {
                  transformedItem.ORMOC = item.count;
                } else if (item.name === 'TANAUAN') {
                  transformedItem.TANAUAN = item.count;
                }
              }
  
              this.transformedData.push(transformedItem);
              
              isFirstRow = false;

            } else {

              const transformedItem: any = {
                particulars: isFirstRow ? group[Number(quarter) - 1]?.[1]?.particulars : '', // Set the value only for the first row
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



