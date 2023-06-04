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
      userid: [data.reportDetails[0].userid],
      date_entry: [data.reportDetails[0].date_entry],
      facilitator: [data.reportDetails[0].facilitator],
      title: [data.reportDetails[0].title],
      type_beneficiary: [data.reportDetails[0].type_beneficiary],
      count_male: [data.reportDetails[0].count_male],
      count_female: [data.reportDetails[0].count_female],
      poor_rate: [data.reportDetails[0].poor_rate],
      fair_rate: [data.reportDetails[0].fair_rate],
      satisfactory_rate: [data.reportDetails[0].satisfactory_rate],
      verysatisfactory_rate: [data.reportDetails[0].verysatisfactory_rate],
      excellent_rate: [data.reportDetails[0].excellent_rate],
      duration: [data.reportDetails[0].duration],
      unitOpt: [data.reportDetails[0].unitOpt],
      serviceOpt: [data.reportDetails[0].serviceOpt],
      partners: [data.reportDetails[0].partners],
      fac_staff: [data.reportDetails[0].fac_staff],
      role: [data.reportDetails[0].role],
      cost_fund: [data.reportDetails[0].cost_fund],
      _file: [data.reportDetails[0]._file || null]
    });

    // Set the dataLoaded flag to true
    this.dataLoaded = true;
     
   }
  
  
  ngOnInit(): void {
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file.name); // logs the file name to the console
  }


  postdata(form:any) {

    const id = this.data.reportDetails[0].entry_id;
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
