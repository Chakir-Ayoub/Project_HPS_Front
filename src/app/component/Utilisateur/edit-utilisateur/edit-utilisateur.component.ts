import { HttpErrorResponse } from '@angular/common/http';
import { Component,OnInit,ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UtilisateurService } from 'src/app/Services/Utilisateur/utilisateur.service';
import { Utilisateur } from 'src/app/models/utilisateur.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-utilisateur',
  templateUrl: './edit-utilisateur.component.html',
  styleUrls: ['./edit-utilisateur.component.css']
})
export class EditUtilisateurComponent implements OnInit {
  userr:Utilisateur;
  utilisateur=new Utilisateur();
  constructor(private dialogModel: MatDialog,private utilisateurservice:UtilisateurService,private _fb:FormBuilder,
    private translate: TranslateService,    private router: Router    ){}
  ngOnInit(): void {
    this.utilisateurservice.GetById(this.utilisateurservice.value).subscribe({
      next:(data)=>{
        this.userr=data;      }
      
    })
  }
  user={
    nom_utilisateur:'',
    prenom_utilisateur:'',
    date_naiss:null,
    email:'',
    telephone:null
  }
  closeDialog(): void {
    this.dialogModel.closeAll();

  }

  GetById(id:Number){
    this.utilisateurservice.GetById(id).subscribe({
      next:(data)=>{
        this.userr.idutilisateur=data.idutilisateur;
        this.userr.nom_utilisateur=data.nom_utilisateur;
        this.userr.prenom_utilisateur=data.prenom_utilisateur;
        this.userr.date_naiss=data.date_naiss;
        this.userr.email=data.email;
        this.userr.telephone=data.telephone;
      }
    })
  }

  @ViewChild('f') signupForm:NgForm;

  Update(){
    const delet='eventRemove';
    Swal.fire({
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: delet ? this.translate.instant('CONFIGURATION.PLANIFICATION.ACTIVATE') : this.translate.instant('CONFIGURATION.PLANIFICATION.DESACTIVATE'),
    }).then((result) => {
      if (result.isConfirmed) {
        this.utilisateur.nom_utilisateur=this.signupForm.value.userdata.nom;
        this.utilisateur.prenom_utilisateur=this.signupForm.value.userdata.prenom;
        this.utilisateur.date_naiss=this.signupForm.value.userdata.date_naiss;
        this.utilisateur.email=this.signupForm.value.userdata.email;
        this.utilisateur.telephone=this.signupForm.value.userdata.telephone;
        this.utilisateurservice.updateuser(this.utilisateurservice.value,this.utilisateur).subscribe({
          next: (response : any) => {
            Swal.fire({
              title: 'done!',
              icon: "success",
            })
            this.closeDialog();
            this.router.navigateByUrl('/user')
          },
          error: (error: HttpErrorResponse) => {
            console.log(error?.error.message || error?.message);
          }
        })
      }
    });
  }  
}
