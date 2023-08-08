import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { AddReportComponent } from '../modules/add-report/add-report.component';
import { ViewReportComponent } from '../modules/view-report/view-report.component';
import { ViewActualReportComponent } from '../modules/view-actual-report/view-actual-report.component';
import { ViewProfileComponent } from '../modules/view-profile/view-profile.component';
import { ViewUserlistComponent } from '../modules/view-userlist/view-userlist.component';
import { LoginComponent } from '../auth/login/login.component';
import { DownloadsComponent } from '../modules/downloads/downloads.component';
import { EditReportComponent } from '../modules/edit-report/edit-report.component';
import { RegisterComponent } from '../auth/register/register.component';
import { NgxPrintModule } from 'ngx-print';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewDownloadsComponent } from '../modules/view-downloads/view-downloads.component';
import { ViewProgramsComponent } from '../modules/view-programs/view-programs.component';
import { AddProgramComponent } from '../modules/add-program/add-program.component';
import { EditProgramComponent } from '../modules/edit-program/edit-program.component';
import { AddUserComponent } from '../modules/add-user/add-user.component';
import { EditUserComponent } from '../modules/edit-user/edit-user.component';
import { AboutComponent } from '../modules/about/about.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    AddReportComponent,
    ViewReportComponent,
    ViewActualReportComponent,
    ViewProfileComponent,
    ViewUserlistComponent,
    LoginComponent,
    DownloadsComponent,
    EditReportComponent,
    RegisterComponent,
    ViewDownloadsComponent,
    ViewProgramsComponent,
    AddProgramComponent,
    EditProgramComponent,
    EditUserComponent,
    AddUserComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    NgxPrintModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
  ]
})
export class DefaultModule { }
