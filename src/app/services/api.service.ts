import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportData, UsersList } from '../models/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = '/api';
  reportData!: ReportData[];
  userData!: UsersList[];
  userID!:string;//new
  userROLE!:string;//new

  constructor(
    private httpClient:HttpClient
  ) { }

  validateCredentials(credentials:any){
    return this.httpClient.get(this.baseUrl + '/checkCredentials.php?info='+ credentials);
  }

  toRegister(email:any, password:any, cpassword:any):Observable<any>{
    return this.httpClient.post(this.baseUrl + '/register', {email, password, cpassword});
  }

  toLogin(credentials:any):Observable<any>{
    return this.httpClient.post(this.baseUrl + '/login', credentials);
  }
  viewUsersList(){
    return this.httpClient.get<UsersList[]>(this.baseUrl + '/getUsers.php');
  }
  
  viewReport(userID:any) {
    return this.httpClient.get<ReportData[]>(this.baseUrl + '/viewReport.php?userid=' + userID);
  }

  getParticularLength(){
    return this.httpClient.get(this.baseUrl + '/viewActualReport.php');
  }

  getDataByParticularId(userid: any, particular_id: any) {
    return this.httpClient.get(`${this.baseUrl}/viewActualReport.php?id=${userid}&particular_id=${particular_id}`);
  }

  addReport(data:any){
    return this.httpClient.post(this.baseUrl + '/insertReport.php', data);
  }

  fetchReportDetailsById(userid:any, entry_id:any){
    return this.httpClient.get(`${this.baseUrl}/viewReport.php?userid=${userid}&entry_id=${entry_id}`);
  }

  updateReport(user_id:any, data:any){
    return this.httpClient.put(this.baseUrl + '/updateReport.php?id=' + user_id, data);
  }

  deleteReport(id:any) {
    return this.httpClient.delete(this.baseUrl + '/delete.php?id='+ id);  
  }
}
