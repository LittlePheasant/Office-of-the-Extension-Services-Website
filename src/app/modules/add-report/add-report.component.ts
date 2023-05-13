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
              @Inject(MAT_DIALOG_DATA) public data: any){}
  
  
  
  ngOnInit(): void {
    this.addReportForm = this._fb.group ({

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
      file: ['']
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file.name); // logs the file name to the console
  }
  

  postdata(form: FormGroup) {

    // const formData = new FormData();

    // const data = form.value;;
    // formData.append('data', data);

    // if (form && form.valid) { // add null check for form

    //   /// append file to form data
    //   const fileControl = form.get('file');
    //   if (fileControl) {
    //     const file = fileControl.value;
    //     formData.append('file', file);
    //   }
    
    //     // append other form data to form data
    //   const date_entryControl = form.get('date_entry');
    //   if (date_entryControl) {
    //     const date_entry = date_entryControl.value;
    //     formData.append('date_entry', date_entry);
    //   }

    //   const facilitatorControl = form.get('facilitator');
    //   if (facilitatorControl) {
    //     const facilitator = facilitatorControl.value;
    //     formData.append('facilitator', facilitator);
    //   }

    //   const titleControl = form.get('title');
    //   if (titleControl) {
    //     const title = titleControl.value;
    //     formData.append('title', title);
    //   }

    //   const type_beneficiaryControl = form.get('type_beneficiary');
    //   if (type_beneficiaryControl) {
    //     const type_beneficiary = type_beneficiaryControl.value;
    //     formData.append('type_beneficiary', type_beneficiary);
    //   }

    //   const count_maleControl = form.get('count_male');
    //   if (count_maleControl) {
    //     const count_male = count_maleControl.value;
    //     formData.append('count_male', count_male);
    //   }

    //   const count_femaleControl = form.get('count_female');
    //   if (count_femaleControl) {
    //     const count_female = count_femaleControl.value;
    //     formData.append('count_female', count_female);
    //   }

    //   const poor_rateControl = form.get('poor_rate');
    //   if (poor_rateControl) {
    //     const poor_rate = poor_rateControl.value;
    //     formData.append('poor_rate', poor_rate);
    //   }

    //   const fair_rateControl = form.get('fair_rate');
    //   if (fair_rateControl) {
    //     const fair_rate = fair_rateControl.value;
    //     formData.append('fair_rate', fair_rate);
    //   }

    //   const satisfactory_rateControl = form.get('satisfactory_rate');
    //   if (satisfactory_rateControl) {
    //     const satisfactory_rate = satisfactory_rateControl.value;
    //     formData.append('satisfactory_rate', satisfactory_rate);
    //   }

    //   const verysatisfactory_rateControl = form.get('verysatisfactory_rate');
    //   if (verysatisfactory_rateControl) {
    //     const verysatisfactory_rate = verysatisfactory_rateControl.value;
    //     formData.append('verysatisfactory_rate', verysatisfactory_rate);
    //   }

    //   const excellent_rateControl = form.get('excellent_rate');
    //   if (excellent_rateControl) {
    //     const excellent_rate = excellent_rateControl.value;
    //     formData.append('excellent_rate', excellent_rate);
    //   }

    //   const durationControl = form.get('duration');
    //   if (durationControl) {
    //     const duration = durationControl.value;
    //     formData.append('duration', duration);
    //   }

    //   const serviceOptControl = form.get('serviceOpt');
    //   if (serviceOptControl) {
    //     const serviceOpt = serviceOptControl.value;
    //     formData.append('serviceOpt', serviceOpt);
    //   }

    //   const partnersControl = form.get('partners');
    //   if (partnersControl) {
    //     const partners = partnersControl.value;
    //     formData.append('partners', partners);
    //   }

    //   const fac_staffControl = form.get('fac_staff');
    //   if (fac_staffControl) {
    //     const fac_staff = fac_staffControl.value;
    //     formData.append('fac_staff', fac_staff);
    //   }

    //   const roleControl = form.get('role');
    //   if (roleControl) {
    //     const role = roleControl.value;
    //     formData.append('role', role);
    //   }
  
    //   // send HTTP request to server
    //   this._api.addReport(formData).subscribe(
    //     (response: any[]) => {
    //       //his.reportData = response;
    //       console.log(response);
    //       alert("Added Successfully!");
    //     },
    //     (error: any) => {
    //       console.log(error);
    //       alert("Failed to add entry.");
    //     }
    //   );
  
    //   // reset form
    //   form.reset();
    // }


    this._api.addReport(this.addReportForm.value).subscribe(
      (response: any[]) => {
        this.reportData = response;
        console.log(response);
        alert("Added Successfully!");
      },
    );

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

  get file() { 
    return this.addReportForm.get('file');
  }

}
