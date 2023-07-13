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
  fileUpload!:File;

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

    this.fileFetched = data.reportDetails.file;
   }
  
  
  ngOnInit(): void {
    const userid = localStorage.getItem('userid');

    this._api.getPrograms(userid)
      .subscribe(
        (response: any) => {
          this.programOptions = response;
        },
        error => {
          console.log('Error retrieving program options.');
        }
      );
      const fileObj: File = this.fileFetched;
      this.fileUpload = fileObj;
      console.log(this.fileUpload);

  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileFetched = file.name;
    this.fileDetails = file;
    console.log(this.fileDetails); // logs the file name to the console
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
    formData.set('user_id', data.user_id);
    formData.set('program_id', data.program_id);
    formData.set('date_entry', this.formattedDate);
    formData.set('title', data.title);
    formData.set('type_beneficiary', data.type_beneficiary);
    formData.set('count_male', countMale);
    formData.set('count_female', countFemale);
    formData.set('poor_rate', poorRate);
    formData.set('fair_rate', fairRate);
    formData.set('satisfactory_rate', satisfactoryRate);
    formData.set('verysatisfactory_rate', verySatisfactoryRate);
    formData.set('excellent_rate', excellentRate);
    formData.set('duration', data.duration);
    formData.set('unitOpt', data.unitOpt);
    formData.set('serviceOpt', data.serviceOpt);
    formData.set('partners', data.partners);
    formData.set('fac_staff', data.fac_staff);
    formData.set('role', data.role);
    formData.set('cost_fund', data.cost_fund);

    if (this.fileDetails) {
      formData.set('file', this.fileDetails);
      console.log('formData1', formData.get('file'));
    } else {
      formData.set('file', this.fileUpload);
      console.log('formData2', formData.get('file'));
    }

    

    
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
    // })

    // console.log(formDataObject);

    // Perform PUT request
    
    this._api.updateReport(id, formData).subscribe(
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

  get file() { 
    return this.editReportForm.get('file');
  }

  

}
