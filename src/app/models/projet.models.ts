import { Details } from "./details.models";

export class Project{
    public idprojet:Number;
    public nomprojet:string;
    public description:string;
    public datedemarrage:Date;
    public datelivraison:Date;

    constructor( nomprojet?:string,description?:string,datedemarrage?:Date,datelivraison?:Date)
    {
        this.nomprojet=nomprojet;
        this.description=description;
        this.datedemarrage=datedemarrage;
        this.datelivraison=datelivraison;
    }
}