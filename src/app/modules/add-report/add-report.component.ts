import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportData } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss']
})
export class AddReportComponent implements OnInit{

  addReportForm!: FormGroup;
  reportData!: ReportData[];
  reportId: number; // Variable to store the report ID
  reportDetails: any; // Variable to store the report details

  constructor (private _fb: FormBuilder,
               private _api: ApiService,
               private _dialogRef: MatDialogRef<AddReportComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any){
                this.reportId = data.reportId; // Assign the report ID from the dialog data
                this.reportDetails = data.reportDetails; // Assign the report details from the dialog data
              }
  
  
  
  ngOnInit(): void {
    if (this.data) {
      this.addReportForm.patchValue({
        date_entry: this.data.date_entry,
        facilitator: this.data.facilitator,
        title: this.data.title,
        type_beneficiary: this.data.type_beneficiary,
        count_male: this.data.count_male,
        count_female: this.data.count_female,
        poor_rate: this.data.poor_rate,
        fair_rate: this.data.fair_rate,
        satisfactory_rate: this.data.satisfactory_rate,
        verysatisfactory_rate: this.data.verysatisfactory_rate,
        excellent_rate: this.data.excellent_rate,
        duration: this.data.duration,
        unitOpt: this.data.unitOpt,
        serviceOpt: this.data.serviceOpt,
        partners: this.data.partners,
        fac_staff: this.data.fac_staff,
        role: this.data.role,
        cost_fund: this.data.cost_fund,
        _file: this.data._file
      })
    } else {
      this.addReportForm = this._fb.group({
        date_entry: ['', [Validators.required]],
        facilitator: ['', [Validators.required]],
        title: ['', [Validators.required]],
        type_beneficiary: ['', [Validators.required]],
        count_male: [0, [Validators.required]],
        count_female: [0, [Validators.required]],
        poor_rate: [0, [Validators.required]],
        fair_rate: [0, [Validators.required]],
        satisfactory_rate: [0, [Validators.required]],
        verysatisfactory_rate: [0, [Validators.required]],
        excellent_rate: [0, [Validators.required]],
        duration: [0, [Validators.required]],
        unitOpt: ['', [Validators.required]],
        serviceOpt: ['', [Validators.required]],
        partners: ['', [Validators.required]],
        fac_staff: ['', [Validators.required]],
        role: ['', [Validators.required]],
        cost_fund: [0.00, [Validators.required]],
        _file: ['']
      });
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file.name); // logs the file name to the console
  }
  

  postdata(form: FormGroup) {

    if (this.reportId) {
      // Perform PUT request
      this._api.updateReport(this.reportId, this.addReportForm.value).subscribe(
        (response: any) => {
          console.log(response);
          alert("Updated Successfully!");
        },
      );
    } else {
      // Perform POST request
      this._api.addReport(this.addReportForm.value).subscribe(
        (response: any) => {
          console.log(response);
          alert("Added Successfully!");
        },
      );
    }

    // reset form
    //form.reset();
    this.dialogClose();
  };

  dialogClose(){
    this._dialogRef.close();
  };
  
  
  

  get date_entry() { 
    return this.addReportForm.get('date_entry');
  }

  get facilitator() { 
    return this.addReportForm.get('facilitator');
  }

  get title() { 
    return this.addReportForm.get('title');
  }

  get type_beneficiary() { 
    return this.addReportForm.get('type_beneficiary');
  }

  get count_male() { 
    return this.addReportForm.get('count_male');
  }
  
  get count_female() { 
    return this.addReportForm.get('count_female');
  }

  get poor_rate() { 
    return this.addReportForm.get('poor_rate');
  }

  get fair_rate() { 
    return this.addReportForm.get('fair_rate');
  }

  get satisfactory_rate() { 
    return this.addReportForm.get('satisfactory_rate');
  }

  get verysatisfactory_rate() { 
    return this.addReportForm.get('verysatisfactory_rate');
  }

  get excellent_rate() { 
    return this.addReportForm.get('excellent_rate');
  }

  get duration() { 
    return this.addReportForm.get('duration');
  }

  get serviceOpt() { 
    return this.addReportForm.get('serviceOpt');
  }

  get partners() { 
    return this.addReportForm.get('partners');
  }

  get fac_staff() { 
    return this.addReportForm.get('fac_staff');
  }

  get role() { 
    return this.addReportForm.get('role');
  }

  get cost_fund() { 
    return this.addReportForm.get('cost_fund');
  }

  get _file() { 
    return this.addReportForm.get('_file');
  }

}
