export interface Maintenance{
    id:string;
    groupId:string;
    priority:string;
    name:string;
    description?:string;
    extraCd1?:string;
    extraCd2?:string;
    extraCd3?:string;
    createdAt?:string;
    createdBy?:string;
    updatedAt?:string;
    updatedBy?:string;
    isActive:boolean;
}