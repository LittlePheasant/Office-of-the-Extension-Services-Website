import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit{

  [x: string]: any;
  userid:any;
  Currentnav: string = '';
  drawerOpened: boolean = false;
  userImg:any;
  currentTime!:string;
  currentDate!:string;

  constructor(private routes: Router, 
              private _api: ApiService,
              private datePipe: DatePipe,) { }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');
    const current = 'Dashboard';
    this.newClass(current);
    //this.routes.navigateByUrl('/main/dashboard');

    this._api.getUsers(this.userid).subscribe((response:any) => {
      
      response.data.forEach((user: any) => {
        user.imagename = this._api.baseUrl + '/' + user.imagename;
        this.userImg = user.imagename;
      });
      
    })

    this.currentDate = this.datePipe.transform(new Date(), 'MMMM dd, yyyy')!;
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000); // Update every second (1000 milliseconds)
    
  }

  newClass(current:string){
    this.Currentnav = current;
    
  }

  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
  }

  onlogOut() {
    const data = localStorage.removeItem('userid');
    console.log(data);
    this.routes.navigateByUrl('login');
  }

  updateTime() {
    const now = new Date();

    this.currentTime = this.datePipe.transform(now, 'hh:mm:ss a', 'Asia/Manila')!;
  }


}
