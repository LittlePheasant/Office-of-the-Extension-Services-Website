import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AddReportComponent } from '../add-report/add-report.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent implements OnInit {
  
  editReportForm!:FormGroup;
  dataLoaded: boolean=false;

  constructor (private _fb: FormBuilder,
    private _api: ApiService,
    private router:Router,
    private activateRoute: ActivatedRoute,
    private _dialogRef: MatDialogRef<EditReportComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any){

    this.editReportForm = this._fb.group({
      date_entry: [data.reportDetails.date_entry],
      facilitator: [data.reportDetails.facilitator],
      title: [data.reportDetails.title],
      type_beneficiary: [data.reportDetails.type_beneficiary],
      count_male: [data.reportDetails.count_male],
      count_female: [data.reportDetails.count_female],
      poor_rate: [data.reportDetails.poor_rate],
      fair_rate: [data.reportDetails.fair_rate],
      satisfactory_rate: [data.reportDetails.satisfactory_rate],
      verysatisfactory_rate: [data.reportDetails.verysatisfactory_rate],
      excellent_rate: [data.reportDetails.excellent_rate],
      duration: [data.reportDetails.duration],
      unitOpt: [data.reportDetails.unitOpt],
      serviceOpt: [data.reportDetails.serviceOpt],
      partners: [data.reportDetails.partners],
      fac_staff: [data.reportDetails.fac_staff],
      role: [data.reportDetails.role],
      cost_fund: [data.reportDetails.cost_fund],
      _file: [data.reportDetails._file || null]
    });
     
   }
  
  
  ngOnInit(): void {
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file.name); // logs the file name to the console
  }


  postdata(form:any) {

    const id = this.data.reportId
    const data = this.editReportForm.value;
    // Perform PUT request
    this._api.updateReport(id, data).subscribe(
      (response: any) => {
        console.log(response);
        alert("Updated Successfully!");
        this.dialogClose();
      },
    );
  }


  dialogClose(){
    this._dialogRef.close();
  };


  get date_entry() { 
    return this.editReportForm.get('date_entry');
  }

  get facilitator() { 
    return this.editReportForm.get('facilitator');
  }

  get title() { 
    return this.editReportForm.get('title');
  }

  get type_beneficiary() { 
    return this.editReportForm.get('type_beneficiary');
  }

  get count_male() { 
    return this.editReportForm.get('count_male');
  }
  
  get count_female() { 
    return this.editReportForm.get('count_female');
  }

  get poor_rate() { 
    return this.editReportForm.get('poor_rate');
  }

  get fair_rate() { 
    return this.editReportForm.get('fair_rate');
  }

  get satisfactory_rate() { 
    return this.editReportForm.get('satisfactory_rate');
  }

  get verysatisfactory_rate() { 
    return this.editReportForm.get('verysatisfactory_rate');
  }

  get excellent_rate() { 
    return this.editReportForm.get('excellent_rate');
  }

  get duration() { 
    return this.editReportForm.get('duration');
  }

  get serviceOpt() { 
    return this.editReportForm.get('serviceOpt');
  }

  get partners() { 
    return this.editReportForm.get('partners');
  }

  get fac_staff() { 
    return this.editReportForm.get('fac_staff');
  }

  get role() { 
    return this.editReportForm.get('role');
  }

  get cost_fund() { 
    return this.editReportForm.get('cost_fund');
  }

  get _file() { 
    return this.editReportForm.get('_file');
  }

  

}
