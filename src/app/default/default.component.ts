import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

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

  constructor(private routes: Router, private _api: ApiService,) { }

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
    
  }

  newClass(current:string){
    this.Currentnav = current;
    
  }

  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
  }




}
