export class Utilisateur{
    public idutilisateur:Number;
    public nom_utilisateur:string;
    public prenom_utilisateur:string;
    public date_naiss:any;
    public email:string;
    public telephone:Number;
    public numAbsencesJustifier:Number;
    public numAbsencesnonJustifier:Number;

    constructor(idutilisateur?:Number,nom_utilisateur?:string,prenom_utilisateur?:string,date_naiss?:any,email?:string,telephone?:Number){}


}