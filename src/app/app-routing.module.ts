import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AddReportComponent } from './modules/add-report/add-report.component';
import { ViewReportComponent } from './modules/view-report/view-report.component';
import { ViewActualReportComponent } from './modules/view-actual-report/view-actual-report.component';

const routes: Routes = [
  {path:'main', component:DefaultComponent,
   children:[
    {path:'dashboard', component:DashboardComponent},
    {path:'add-report', component:AddReportComponent},
    {path:'view-report', component:ViewReportComponent},
    {path:'view-actual-report', component:ViewActualReportComponent}
   ]},
   {path:'', redirectTo:'/main', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
