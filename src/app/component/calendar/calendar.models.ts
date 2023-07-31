import { Time } from "@angular/common";
import { Injectable } from "@angular/core";
import { WorkHoursModel } from "@syncfusion/ej2-angular-schedule";
import { Observable } from "rxjs";
import { Planification } from "src/app/models/Planification.models";
import { Session } from "src/app/models/Session.models";

export class Calendar{
     Subject: any;
     Status:String;
     StartTime:any;
     EndTime:any;
     Description:any;
     DatePlanification: any;

    constructor(Subject?:any,Status?:String,StartTime?:any,EndTime?:any,Description?:any,DatePlanification?: any){
        this.Subject=Subject;
        this.Status=Status;
        this.StartTime=StartTime;
        this.EndTime=EndTime;
        this.Description=Description;
        this.DatePlanification=DatePlanification
    }

    get getDatePlanification(){
        return this.DatePlanification;
    } 
    get getsubject():String{
        return this.Subject;
    }
    get getstatus():String{
        return this.Status;
    }
    get getstartTime():any{
        return this.StartTime;
    }
    get getEndTime():any{
        return this.EndTime;
    }
    get getDescription():String{
        return this.Description;
    } 

    //Setters
    set setDatePlanification(DatePlanification){
        this.DatePlanification=DatePlanification;
    }
    set setsubject(subject){
        this.Subject=subject;
    }
    set setstatus(status){
        this.Status=status;
    }
    set setstartTime(StartTime:any){
        this.StartTime=StartTime;
    }
    set setEndTime(EndTime:any){
        this.EndTime=EndTime;
    }
    set setDescription(Description){
        this.Description=Description;
    }

    PlanificationToCalender(planification: Planification): void {
        this.DatePlanification = planification.datePlanification;
            for(let s of planification.sessions){
                this.Subject=s.nomsession
                this.StartTime=s.heureD
                this.EndTime=s.heureF
            }
      }  
}