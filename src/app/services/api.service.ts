import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportData, UsersList } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = "https://api-nine-lac.vercel.app/api";
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
  toLogin(credentials:any){
    return this.httpClient.post(this.baseUrl + '/login.php', credentials);
  }
  viewUsersList(){
    return this.httpClient.get<UsersList[]>(this.baseUrl + '/getUsers.php');
  }
  
  viewReport(userID:any) {
    return this.httpClient.get<ReportData[]>(this.baseUrl + '/viewReport.php?id=' + userID);
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

  fetchReportDetailsById(reportId:number){
    return this.httpClient.get(this.baseUrl + '/viewReport.php?entry_id=' + reportId);
  }

  updateReport(reportId:number, data:any){
    return this.httpClient.put(this.baseUrl + '/updateReport.php?id=' + reportId, data);
  }

  deleteReport(id:any) {
    return this.httpClient.delete(this.baseUrl + '/delete.php?id='+ id);  
  }
}
