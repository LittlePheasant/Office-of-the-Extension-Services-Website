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

  constructor (private _fb: FormBuilder,
               private _api: ApiService,
               private _dialogRef: MatDialogRef<AddReportComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any){
              }
  
  
  
  ngOnInit(): void {

    const userid = localStorage.getItem('userid');

    this.addReportForm = this._fb.group({
      user_id: [userid],
      program_id: ['', [Validators.required]],
      date_entry: ['', [Validators.required]],
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file.name); // logs the file name to the console
  }
  

  postdata(form: FormGroup) {

    // Perform POST request
    this._api.addReport(this.addReportForm.value).subscribe(
      (response: any) => {
        console.log(response);
        if(this.addReportForm.valid && response.status.OK){
          alert("Added Successfully!");
          this.dialogClose();
        }
      },
    );

    // reset form
    //form.reset();
    
  };

  dialogClose(){
    this._dialogRef.close();
  };
  
  
  get program_id() { 
    return this.addReportForm.get('program_id');
  }

  get date_entry() { 
    return this.addReportForm.get('date_entry');
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
