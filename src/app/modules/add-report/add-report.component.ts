import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { error } from 'highcharts';
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
  programOptions: any[] = [];
  fileName: any = '';
  formattedDate: any = '';

  constructor (private _fb: FormBuilder,
               private _api: ApiService,
               private datePipe: DatePipe,
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
      file: ['']
    });

    this._api.getPrograms(userid)
      .subscribe(
        (response: any) => {
          this.programOptions = response;
        },
        error => {
          console.log('Error retrieving program options.');
        }
      );
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileName = file;
      console.log(this.fileName); // logs the file name to the console
    }

  }
  

  postdata() {
    this.formattedDate = this.datePipe.transform(this.addReportForm.get('date_entry')?.value, 'yyyy-MM-dd');

    const poorRate = this.addReportForm.get('poor_rate')?.value;
    const fairRate = this.addReportForm.get('fair_rate')?.value;
    const satisfactoryRate = this.addReportForm.get('satisfactory_rate')?.value;
    const verySatisfactoryRate = this.addReportForm.get('verysatisfactory_rate')?.value;
    const excellentRate = this.addReportForm.get('excellent_rate')?.value;
    const countMale = this.addReportForm.get('count_male')?.value;
    const countFemale = this.addReportForm.get('count_female')?.value;

    // Perform the sum calculations
    const sumSatisfactionRates = poorRate + fairRate + satisfactoryRate + verySatisfactoryRate + excellentRate;
    const sumCount = countMale + countFemale;
    const formData = new FormData();

    formData.append('user_id', this.addReportForm.get('user_id')?.value);
    formData.append('program_id', this.addReportForm.get('program_id')?.value);
    formData.append('date_entry', this.formattedDate);
    formData.append('title', this.addReportForm.get('title')?.value);
    formData.append('type_beneficiary', this.addReportForm.get('type_beneficiary')?.value);
    formData.append('count_male', countMale);
    formData.append('count_female', countFemale);
    formData.append('poor_rate', poorRate);
    formData.append('fair_rate', fairRate);
    formData.append('satisfactory_rate', satisfactoryRate);
    formData.append('verysatisfactory_rate', verySatisfactoryRate);
    formData.append('excellent_rate', excellentRate);
    formData.append('duration', this.addReportForm.get('duration')?.value);
    formData.append('unitOpt', this.addReportForm.get('unitOpt')?.value);
    formData.append('serviceOpt', this.addReportForm.get('serviceOpt')?.value);
    formData.append('partners', this.addReportForm.get('partners')?.value);
    formData.append('fac_staff', this.addReportForm.get('fac_staff')?.value);
    formData.append('role', this.addReportForm.get('role')?.value);
    formData.append('cost_fund', this.addReportForm.get('cost_fund')?.value);
    formData.append('file', this.fileName);

    // Convert FormData to plain JavaScript object
    // const formDataObject: any = {};
    // formData.forEach((value: any, key: any) => {
    //   if (key === 'file') {
    //     formDataObject[key] = {
    //       name: value.name,
    //       type: value.type,
    //       size: value.size,
    //       lastModified: value.lastModified,
    //       lastModifiedDate: value.lastModifiedDate
    //     };
    //   } else {
    //       formDataObject[key] = value;
    //   }

    // });
    
    // console.log("FormData Object:", formDataObject);

    if (sumSatisfactionRates === sumCount) { //check if total ratings are equal to total of beneficiaries

      if (!this.fileName) { //check if file is selected

        alert ("No file SELECTED!\nPlease select one!");
        
      } else {
        // Perform POST request
        this._api.addReport(formData).subscribe(
          (response: any) => {
            //console.log(response);
            if(response.success  === 1){
              alert("Added Successfully!");
              this.dialogClose();
              window.location.reload();
            }
          }, (error:any) => {
            console.log(error);
          }
        );
      }
      
    } else {
      alert ("Total of Quality and Relavance Ratings IS NOT EQAUL to total No. of Beneficiaries.\nPlease DOUBLE CHECK!")
    }
    

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

  get unitOpt() { 
    return this.addReportForm.get('unitOpt');
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

  get file() { 
    return this.addReportForm.get('file');
  }

}
