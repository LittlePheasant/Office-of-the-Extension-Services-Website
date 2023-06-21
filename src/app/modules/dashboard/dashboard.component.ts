import { Component, ElementRef, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import xrange from 'highcharts/modules/xrange';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import { ApiService } from 'src/app/services/api.service';
import { NavigationSkipped } from '@angular/router';


HighchartsAccessibility(Highcharts);
HighchartsExporting(Highcharts);
xrange(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalAccomplishments!: number;
  totalUsers!: number;
  totalActualReports!:number;
  //data=[];
  isDisabled: boolean;
  userid!: string; //new

  constructor(
    private _api:ApiService,
    private elementRef: ElementRef
  ) { 
    this.isDisabled = false;
    this.userid = this._api.userID;
  }

  ngOnInit(): void {
    
    const userid = localStorage.getItem('userid');

    this._api.viewReport(userid)
    .subscribe(
      (response: any) => {
        this.totalAccomplishments = response.length;
      }
    )

    this._api.viewUsersList()
    .subscribe(
      (response: any) => {
        console.log(response);
        this.totalUsers = response.length;
      }
    );

    this._api.getParticulars(userid)
    .subscribe(
      (response: any) => {
        console.log(response);
        this.totalActualReports = response.length;
      }
    )

    this.loadChart();


  };

  loadChart(){
    const particular_id = 1;
    const userid = localStorage.getItem('userid');

    this._api.getDataByParticularId(userid, particular_id).subscribe((response: any) => {
      if (response && response.length > 0) {
        const chartData = [];
  
        for (let i = 0; i < response.length; i++) {
          chartData.push({
            name: response[i].name,
            x: i,
            y: parseInt(response[i].count),
          });
        }
  
        // Define options for chart 1
        const options1: Highcharts.Options = { 
          chart: { type: 'column' },
          title: { text: 'Output Indicator 1' },
          xAxis: { type: 'category' },
          yAxis: { title: {
            text: ''
            }
          },
          //colors: ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#00FFFF', '#FFFF00', '#C0C0C0'],
          plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    //format: '{point.y:.1f}%'
                }
            },
            // column: {
            //   colorByPoint: true
            // }
          },
          
          accessibility: {
            enabled: true,
          },
          exporting: {
            enabled: true
          },
          series: [
            {
              type: 'column',
              name: 'Number of Active Partnerships with LGUs, industries, NGOs, NGAs, SMEs, and other stakeholders as a result of extension services',
              data: chartData, // Pass chartData as an array without brackets
              color: '#0000FF'
            },
          ],
        };
  
        const container1 = this.elementRef.nativeElement.querySelector('#chart1');
        Highcharts.chart(container1, options1);
        //HighchartsExporting
      }
    });

    this._api.getDataByParticularId(userid, particular_id + 1).subscribe((response: any) => {

      if (response && response.length > 0) {
        const chartData = [];
    
        for (let i = 0; i < response.length; i++) {
          chartData.push({
            name: response[i].name,
            x: i,
            y: parseInt(response[i].count),
          });
        }

              // Define options for chart 2
    const options2: Highcharts.Options = { 
      chart: { type: 'column' },
      title: { text: 'Output Indicator 2' },
      xAxis: { type: 'category' },
      yAxis: { title: {
        text: ''
        }
      },
      plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                //format: '{point.y:.1f}%'
            }
        }
      },
      accessibility: {
        enabled: true,
      },
      series: [
        {
          type: 'column',
          name: 'Number of Trainees weighted by the length of training',
          data: chartData,
          color: '#FF00FF'
        },
      ],
    };
        // Create chart 2
    const container2 = this.elementRef.nativeElement.querySelector('#chart2');
    Highcharts.chart(container2, options2);
      }
    });

    this._api.getDataByParticularId(userid, particular_id + 2).subscribe((response: any) => {

      if (response && response.length > 0) {
        const chartData = [];
    
        for (let i = 0; i < response.length; i++) {
          chartData.push({
            name: response[i].name,
            x: i,
            y: parseInt(response[i].count),
          });
        }

              // Define options for chart 3
    const options3: Highcharts.Options = { 
      chart: { type: 'column' },
      title: { text: 'Output Indicator 3' },
      xAxis: { type: 'category' },
      yAxis: { title: {
        text: ''
        }
      },
      plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                //format: '{point.y:.1f}%'
            }
        }
      },
      accessibility: {
        enabled: true,
      },
      series: [
        {
          type: 'column',
          name: 'Number of Extension Programs organized AND supported CONSISTENT WITH the SUCs mandated and priority programs',
          data: chartData,
          color: '#C0C0C0'
        },
      ],
    };
        // Create chart 2
    const container3 = this.elementRef.nativeElement.querySelector('#chart3');
    Highcharts.chart(container3, options3);
      }
    });

    this._api.getDataByParticularId(userid, particular_id + 3).subscribe((response: any) => {

      if (response && response.length > 0) {
        const data = response;
        const chartData = [];
    
        for (let i = 0; i < response.length; i++) {
          chartData.push({
            name: response[i].name,
            x: i,
            y: parseInt(response[i].count),
          });
        }

              // Define options for chart 2
    const options4: Highcharts.Options = { 
      chart: { type: 'column' },
      title: { text: 'Output Indicator 4' },
      xAxis: { type: 'category' },
      yAxis: { title: {
        text: ''
        }
      },
      plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
            }
        }
      },
      accessibility: {
        enabled: true,
      },
      series: [
        {
          type: 'column',
          name: 'Percentage of Beneficiaries who rate the traning course/s as satisfactory or higher in terms of quality and relevance',
          data: chartData,
        },
      ],
    };
        // Create chart 4
    const container4 = this.elementRef.nativeElement.querySelector('#chart4');
    Highcharts.chart(container4, options4);
      }
    });

  };

  disableChart(){
    this.isDisabled=true;
  }
}
