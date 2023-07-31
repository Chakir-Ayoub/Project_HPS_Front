import { Calendar } from "../component/calendar/calendar.models";
import { Session } from "./Session.models";

export class Planification{
    public idPlanification:Number;
    public datePlanification:Date;
    public sessions:Session[]=[];

    constructor (datePlanification?: any,session?:Session){
        this.datePlanification=datePlanification;
        this.sessions.push(session);
    }

    get getdatePlanification(){
        return this.datePlanification;
    }



    CalenderToPlanification(calender:Calendar):void{
        this.datePlanification=calender.getDatePlanification;
        this.sessions=[new Session(calender.Subject,calender.StartTime,calender.EndTime)]
    }
}