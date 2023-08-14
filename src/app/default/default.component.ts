import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  username!:string;
  useremail!:string;
  currentTime!:string;
  currentDate!:string;
  darkMode:boolean = false;

  constructor(private routes: Router, 
              private _api: ApiService,
              private datePipe: DatePipe,
              private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');
    const current = 'Dashboard';
    this.newClass(current);
    //this.routes.navigateByUrl('/main/dashboard');

    this._api.getUsers(this.userid).subscribe((response:any) => {
      
      response.data.forEach((user: any) => {
        user.imagename = this._api.baseUrl + '/' + user.imagename;
        this.userImg = user.imagename;

        this.username = user.username;

        this.useremail = user.user_email;
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

    const snackBarRef = this.snackBar.open('Please confirm to continue!', 'Confirm', {
      panelClass: ['success-snackbar'],
    });

    snackBarRef.afterDismissed().subscribe(() => {
      localStorage.removeItem('userid');
      this.routes.navigateByUrl('login');
    });

  }

  updateTime() {
    const now = new Date();

    this.currentTime = this.datePipe.transform(now, 'hh:mm:ss a', 'Asia/Manila')!;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }


}
