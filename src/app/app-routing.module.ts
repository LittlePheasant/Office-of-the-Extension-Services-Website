import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AddReportComponent } from './modules/add-report/add-report.component';
import { ViewReportComponent } from './modules/view-report/view-report.component';
import { ViewActualReportComponent } from './modules/view-actual-report/view-actual-report.component';
import { ViewUserlistComponent } from './modules/view-userlist/view-userlist.component';
import { ViewProfileComponent } from './modules/view-profile/view-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ViewDownloadsComponent } from './modules/view-downloads/view-downloads.component';
import { ViewProgramsComponent } from './modules/view-programs/view-programs.component';
import { AboutComponent } from './modules/about/about.component';

const routes: Routes = [
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'main', component:DefaultComponent,
   children:[
    {path:'about-us', component:AboutComponent},
    {path:'dashboard', component:DashboardComponent},
    {path:'view-report', component:ViewReportComponent},
    {path:'view-actual-report', component:ViewActualReportComponent},
    {path:'view-profile', component:ViewProfileComponent},
    {path:'view-userlist', component:ViewUserlistComponent},
    {path:'view-downloads', component:ViewDownloadsComponent},
    {path:'view-programs', component:ViewProgramsComponent}
   ]},
  {path:'', redirectTo:'/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
