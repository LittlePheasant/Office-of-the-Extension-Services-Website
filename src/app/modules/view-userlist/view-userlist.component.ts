import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { UsersList } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-userlist',
  templateUrl: './view-userlist.component.html',
  styleUrls: ['./view-userlist.component.scss']
})
export class ViewUserlistComponent {

  userData!:UsersList[];
  searchText: any;

  columns = ['index', 'name', 'username', 'role', 'actions'];

  // Declare the data source
  data = new MatTableDataSource<Data>();

  // Declare the paginator and sort
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public _api: ApiService){}


  ngOnInit(): void {
    this.viewUsers();
  }

  ngAfterViewInit(): void {
    this.data.paginator = this.paginator;
    this.data.sort =this.sort
    
  }

  viewUsers(){
    this._api.viewUsersList()
    .subscribe(
      (response: any) => {
        this._api.userData = response;
        console.log(response)
        this.data.data = response;
        console.log(response);
      }
    );
  }

  delete(id:number){
    console.log(id);
     this._api.deleteReport(id).subscribe(data=>{
        this.data.data = this.data.data.filter((u: any) => u !== data);
        console.log(this.data);
     })

     window.location.reload();
  }

}
