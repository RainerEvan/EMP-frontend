export interface Paycheck{
    id:string;
    employeeId?:string;
    fileName?:string;
    fileBase64?:string;
    dateLastSent?:string;
    countSent?:string;
    createdAt?:string;
    createdBy?:string;
}