export interface ReportData {
    user_id:UsersList,
    date_entry:string,
    facilitator:string, 
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
    _file:File
}


export interface UsersList {
    user_id:number,
    name:string,
    username:string, 
    user_password:string, 
    user_role:string
}

export interface Particulars {
    particular_id:number,
    particulars:string
}

export interface ReportCount {
    particulars_id:Particulars['particular_id'],
    user_id:UsersList['user_id'],
    count:number

}

export interface Data {
    Particulars: string;
    CAAD: string;
    CAS: string;
    COBE: string;
    COE: string;
    COED: string;
    COT: string;
    GS: string;
    BURAUEN: string;
    CARIGARA: string;
    DULAG: string;
    ORMOC: string;
    TANAUAN: string;
  }
  
