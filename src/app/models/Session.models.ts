import { Time } from "@angular/common";
import { Calendar } from "../component/calendar/calendar.models";
import { Planification } from "./Planification.models";

export class Session{
    public nomsession:String;
    public heureD:any;
    public heureF:any;

    constructor (nomsession:String,heureD:any,heureF:any){
        this.nomsession=nomsession;
        this.heureD=heureD;
        this.heureF=heureF;
    }

    get getnomsesion(){
        return this.nomsession;
    }
    get getheureD(){
        return this.heureD;
    }
    get getheureF(){
        return this.heureF;
    }

    set setnomsesion(nom:String){
        this.nomsession=nom;
    }
    set setheureD(heureD: any){
        this.heureD=heureD;
    }
    set setheureF(heureF: any){
        this.heureF=heureF;
    }

 
}