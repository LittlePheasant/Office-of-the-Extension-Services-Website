import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Downloadables, ReportCount, ReportData, UsersList } from '../models/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseUrl = 'http://localhost:8080/apiConnection';
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
    return this.httpClient.post(this.baseUrl + '/register.php', {email, password, cpassword});
  }

  toLogin(credentials:any){
    return this.httpClient.post(this.baseUrl + '/login.php', credentials);
  }

  uploadFile(file:any){
    return this.httpClient.post(this.baseUrl + '/uploadFile.php', file);
  }

  viewUsersList(){
    return this.httpClient.get<UsersList[]>(this.baseUrl + '/getUsers.php');
  }
  
  viewReport(userID:any) {
    return this.httpClient.get<ReportData[]>(this.baseUrl + '/viewReport.php?id=' + userID);
  }

  viewProgramInfo(userid:any, programid:any){
    return this.httpClient.get(`${this.baseUrl}/getPrograms.php?id=${userid}&programid=${programid}`);
  }

  viewUploadedFiles(userid:any){
    return this.httpClient.get<Downloadables[]>(`${this.baseUrl}/viewUploadedFiles.php?id=${userid}`);
  }

  getParticularsLength(){
    return this.httpClient.get(`${this.baseUrl}/viewActualReport.php`);
  }

  getParticulars(userid:any){
    return this.httpClient.get<ReportCount[]>(`${this.baseUrl}/viewActualReport.php?id=${userid}`);
  }

  getDataByParticularId(userid: any, particular_id: any) {
    return this.httpClient.get(`${this.baseUrl}/viewActualReport.php?id=${userid}&particular_id=${particular_id}`);
  }

  getPrograms(userid:any){
    return this.httpClient.get(`${this.baseUrl}/getPrograms.php?id=${userid}`);
  }

  getUsers(userid:any) {
    return this.httpClient.get(`${this.baseUrl}/getUsers.php?id=${userid}`);
  }

  addReport(data:any):Observable<any>{
    return this.httpClient.post<ReportData[]>(this.baseUrl + '/insertReport.php', data);
  }

  addUser(data:any){
    return this.httpClient.post<UsersList[]>(this.baseUrl + '/insertUser.php', data);
  }

  addProgram(data:any) {
    return this.httpClient.post(this.baseUrl + '/insertProgram.php', data);
  }

  fetchReportDetailsById(userid:any, entry_id:any){
    return this.httpClient.get(`${this.baseUrl}/viewReport.php?id=${userid}&entry_id=${entry_id}`);
  }

  viewReportByprogramID(userid:any, programID:any){
    return this.httpClient.get(`${this.baseUrl}/viewReport.php?id=${userid}&programid=${programID}`);
  }

  updateReport(entry_id:any, data:any){
    return this.httpClient.post<ReportData[]>(`${this.baseUrl}/updateReport.php?id=${entry_id}`, data);
  }

  updateUserInfo(user_id:any, data:any){
    return this.httpClient.post<UsersList[]>(`${this.baseUrl}/updateUser.php?id=${user_id}`, data);
  }

  updateProgramInfo(user_id:any, data:any){
    return this.httpClient.put<ReportData[]>(`${this.baseUrl}/updateProgram.php?id=${user_id}`, data);
  }

  updateStatus(entry_id:any, statusUpdate:any){
    return this.httpClient.put(`${this.baseUrl}/updateReport.php?id=${entry_id}`, statusUpdate);
  }

  deleteReport(id:any) {
    return this.httpClient.delete(`${this.baseUrl}/deleteReport.php?id=${id}`);
  }

  deleteProgram(id:any) {
    return this.httpClient.delete(`${this.baseUrl}/deleteProgram.php?id=${id}`);  
  }
}
