export interface MaintenanceGroup{
    id:string;
    groupId:string;
    name:string;
    description?:string;
    createdAt?:string;
    createdBy?:string;
    updatedAt?:string;
    updatedBy?:string;
    isActive:boolean;
}