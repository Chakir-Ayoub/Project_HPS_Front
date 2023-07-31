export class Details{
    public commentaire:string;
    public dateCommentaire:Date;
    public doing:string;
    public todo:string;
    public done:string;

    constructor(commentaire?:string,dateCommentaire?:Date,doing?:string,todo?:string,done?:string){
        this.commentaire=commentaire;
        this.dateCommentaire=dateCommentaire;
        this.doing=doing;
        this.todo=todo;
        this.done=done;
    }
}