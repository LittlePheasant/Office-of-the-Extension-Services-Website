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
  totalDownloadbles!:number;
  totalPrograms!:number;
  userid!: string; //new
  userrole!:string;
  selectedOption: string = 'accomplishment'; // Set the default option
  totalToShow: number = 0; // Replace '0' with the appropriate default value
  iconToShow: string = 'checklist'; // Set the default icon value
  routerLinkToShow: string = '../view-report'; // Set the default routerLink value

  constructor(
    private _api:ApiService,
    private elementRef: ElementRef
  ) { 
    this.userid = this._api.userID;
  }

  ngOnInit(): void {

    const userid = localStorage.getItem('userid');

    this._api.viewReport(userid)
    .subscribe(
      (response: any) => {
        this.totalAccomplishments = response.data.length;

        this.totalToShow = this.totalAccomplishments;

        //console.log(this.totalAccomplishments)

        this.userrole = response.userRole;

        //console.log(this.userrole)
        
      }
    )

    this._api.viewUsersList()
    .subscribe(
      (response: any) => {
        this.totalUsers = response.data.length;
        
      }
    );

    this._api.getParticularsLength()
    .subscribe(
      (response: any) => {
        this.totalActualReports = response.length;
      }
    );

    this._api.viewUploadedFiles(userid)
    .subscribe(
      (response: any) => {
        this.totalDownloadbles = response.data.length;

      }
    );
    
    this._api.getPrograms(userid)
    .subscribe(
      (response:any) => {
        this.totalPrograms = response.data.length;
        //console.log(response);
      }
    );

    this.isAdmin();

    this.loadChart();
    
    this.updateContent();

  };

  loadChart(){
    const particular_id = 1;
    const userid = localStorage.getItem('userid');

    this._api.getDataByParticularId(userid, particular_id).subscribe((response: any) => {
      if (response && response.length > 0) {
        const chartData = [];
  
        for (let i = 0; i < response.length; i++) {
          if(this.userrole === 'ADMIN') {
            chartData.push({
              name: response[i].name,
              x: i,
              y: parseInt(response[i].count),
            });
          } else {
            chartData.push({
              name: 'Quarter ' + [i + 1],
              x: i,
              y: parseInt(response[i].count),
            });
          }
        }
  
        // Define options for chart 1
        const options1: Highcharts.Options = { 
          chart: { type: 'column' },
          title: { text: 'Outcome Indicator 1' },
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
      }
    });

    this._api.getDataByParticularId(userid, particular_id + 1).subscribe((response: any) => {

      if (response && response.length > 0) {
        const chartData = [];
    
        for (let i = 0; i < response.length; i++) {
          if(this.userrole === 'ADMIN') {
            chartData.push({
              name: response[i].name,
              x: i,
              y: parseInt(response[i].count),
            });
          } else {
            chartData.push({
              name: 'Quarter ' + [i + 1],
              x: i,
              y: parseInt(response[i].count),
            });
          }
        }

              // Define options for chart 2
        const options2: Highcharts.Options = { 
          chart: { type: 'column' },
          title: { text: 'Output Indicator 1' },
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
                    format: '{point.y:.2f}'
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
          if(this.userrole === 'ADMIN') {
            chartData.push({
              name: response[i].name,
              x: i,
              y: parseInt(response[i].count),
            });
          } else {
            chartData.push({
              name: 'Quarter ' + [i + 1],
              x: i,
              y: parseInt(response[i].count),
            });
          }
        }

              // Define options for chart 3
    const options3: Highcharts.Options = { 
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
          if(this.userrole === 'ADMIN') {
            chartData.push({
              name: response[i].name,
              x: i,
              y: parseInt(response[i].count),
            });
          } else {
            chartData.push({
              name: 'Quarter ' + [i + 1],
              x: i,
              y: parseInt(response[i].count),
            });
          }
        }

              // Define options for chart 2
    const options4: Highcharts.Options = { 
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
                format: '{point.y:.2f}%'
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

  isAdmin(){
    return this.userrole === 'ADMIN';
    
  }

  updateContent() {
    if (this.selectedOption === 'accomplishment') {
        this.totalToShow = this.totalAccomplishments;
        this.iconToShow = 'checklist';
        this.routerLinkToShow = '../view-report';
    } else {
        this.totalToShow = this.totalActualReports;
        this.iconToShow = 'list_alt';
        this.routerLinkToShow = '../view-actual-report';
    }
}

}
