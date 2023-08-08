import { Binary } from "@angular/compiler";

export interface ReportData {
    user_id:UsersList,
    date_entry:string,
    title:string, 
    type_beneficiary:string, 
    count_male:number, 
    count_female:number,
    poor_rate:number, 
    fair_rate: number, 
    satisfactory_rate:number, 
    verysatisfactory_rate:number, 
    excellent_rate:number, 
    duration:number,
    unitOpt:string,
    serviceOpt:string[], 
    partners:string, 
    fac_staff:string,
    role:string, 
    cost_fund:number,
    file:File
}


export interface UsersList {
    user_id:number,
    name:string,
    username:string, 
    user_password:string, 
    user_role:string,
    file:File
}

export interface Particulars {
    particulars_id:number,
    particulars:string
}

export interface ReportCount {
    user_id: string;
    particular_id:string,
    particulars:Particulars['particulars'],
    // name:UsersList['name'],
    count:string

}

export interface Data {
    ParticularsId: string;
    Particulars: string;
    [key: string]: string | number 
}

export interface Downloadables {
    df_id:number,
    _filename:string,
    uploaded_at:string
}
  
