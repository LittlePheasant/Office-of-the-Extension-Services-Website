import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AddReportComponent } from '../add-report/add-report.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent implements OnInit {
  
  editReportForm!:FormGroup;
  dataLoaded: boolean=false;
  programOptions: any[] = [];
  fileFetched:any;
  fileDetails!:File;
  formattedDate: any = '';

  constructor (private _fb: FormBuilder,
    private _api: ApiService,
    private datePipe: DatePipe,
    private router:Router,
    private activateRoute: ActivatedRoute,
    private _dialogRef: MatDialogRef<EditReportComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any){

    this.editReportForm = this._fb.group({
      entry_id: [data.reportDetails.entry_id],
      user_id: [data.reportDetails.user_id],
      program_id: [data.reportDetails.program_id],
      date_entry: [data.reportDetails.date_entry],
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
      file: [data.reportDetails.file]
    });

    // Set the dataLoaded flag to true
    this.dataLoaded = true;
    console.log(data);

   }
  
  
  ngOnInit(): void {
    const userid = localStorage.getItem('userid');

    this._api.getPrograms(userid)
      .subscribe(
        (response: any) => {
          this.programOptions = response.data;
        },
        error => {
          console.log('Error retrieving program options.');
        }
      );
      //const files: File = this.data.reportDetails.file;
      this.fileFetched = this.data.reportDetails.file;

  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.fileFetched = file.name;
    this.fileDetails = file;
    console.log(this.fileDetails);
  }


  postdata() {
    const id = this.data.reportDetails.entry_id;
    const data = this.editReportForm.value;

    this.formattedDate = this.datePipe.transform(data.date_entry, 'yyyy-MM-dd');

    const poorRate = data.poor_rate;
    const fairRate = data.fair_rate;
    const satisfactoryRate = data.satisfactory_rate;
    const verySatisfactoryRate = data.verysatisfactory_rate;
    const excellentRate = data.excellent_rate;
    const countMale = data.count_male;
    const countFemale = data.count_female;

    // Perform the sum calculations
    const sumSatisfactionRates = poorRate + fairRate + satisfactoryRate + verySatisfactoryRate + excellentRate;
    const sumCount = countMale + countFemale;

    const formData = new FormData();
    formData.append('user_id', data.user_id);
    formData.append('program_id', data.program_id);
    formData.append('date_entry', this.formattedDate);
    formData.append('title', data.title);
    formData.append('type_beneficiary', data.type_beneficiary);
    formData.append('count_male', countMale);
    formData.append('count_female', countFemale);
    formData.append('poor_rate', poorRate);
    formData.append('fair_rate', fairRate);
    formData.append('satisfactory_rate', satisfactoryRate);
    formData.append('verysatisfactory_rate', verySatisfactoryRate);
    formData.append('excellent_rate', excellentRate);
    formData.append('duration', data.duration);
    formData.append('unitOpt', data.unitOpt);
    formData.append('serviceOpt', data.serviceOpt);
    formData.append('partners', data.partners);
    formData.append('fac_staff', data.fac_staff);
    formData.append('role', data.role);
    formData.append('cost_fund', data.cost_fund);

    if (this.fileDetails) {
      formData.append('file', this.fileDetails);
      console.log('formData1', formData.get('file'));
    } else {
      formData.append('file', this.fileFetched);
      console.log('formData2', formData.get('file'));
    }


    if (this.editReportForm.valid) { //check first before sending put request

      if (sumSatisfactionRates === sumCount) { //check if total ratings are equal to total of beneficiaries

        // Perform POST request
        this._api.updateReport(id, formData).subscribe(
          (response: any) => {
            //console.log(response);
            if(response.success  === 1){
              alert(response.message);
              this.dialogClose();
              window.location.reload();
            } else {
              alert(response.message);
            }
          }, (error:any) => {
            console.log(error);
          }
        );
        
      } else {
        alert ("Total of Quality and Relavance Ratings IS NOT EQAUL to total No. of Beneficiaries.\nPlease DOUBLE CHECK!")
      }

    } else { //alert if form has invalid input

      alert('Please check inputs!');
    }
    
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

  get file() { 
    return this.editReportForm.get('file');
  }

  

}
