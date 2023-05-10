export interface ReportData {
    entry_id:number,
    date_entry:string,
    facilitator:string, 
    title:string, 
    type_beneficiary:string, 
    count_male:string, 
    count_female:string,
    poor_rate:number, 
    fair_rate: number, 
    satisfactory_rate:number, 
    verysatisfactory_rate:number, 
    excellent_rate:number, 
    duration:number,
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
    user_role:string
}

export interface IndicatorsList {
    particulars_id:number,
    particulars:string

}
