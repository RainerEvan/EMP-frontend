export interface Paycheck{
    id:string;
    employeeId?:string;
    baseSalary?:number;
    transportationAllowance?:number;
    foodAllowance?:number;
    overtime?:number;
    totalGrossIncome?:number;
    bpjsKesehatan?:number;
    bpjsKetenagakerjaan?:number;
    tax?:number;
    otherCut?:number;
    totalDeduction?:number;
    totalNetIncome?:number;
    fileName?:string;
    fileBase64?:string;
    bankAccount?:string;
    bankAccountNum?:string;
    dateLastSent?:string;
    countSent?:number;
    createdAt?:string;
    createdBy?:string;
}