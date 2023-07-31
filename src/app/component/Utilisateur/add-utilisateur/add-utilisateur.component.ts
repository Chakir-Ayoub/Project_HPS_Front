import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/Services/Utilisateur/utilisateur.service';
import { Utilisateur } from 'src/app/models/utilisateur.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-utilisateur',
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.css']
})
export class AddUtilisateurComponent {
  constructor(private dialogModel: MatDialog,private utilisateurservice:UtilisateurService,private router: Router){}
  message:any;
  userr=new Utilisateur();

  closeDialog(): void {
    this.dialogModel.closeAll();
  }

  user={
    nom_utilisateur:'',
    prenom_utilisateur:'',
    date_naiss:null,
    email:'',
    telephone:null
  }

  @ViewChild('f') signupForm:NgForm;
  onsubmit(){
      this.user.nom_utilisateur=this.signupForm.value.userdata.nom;
      this.user.prenom_utilisateur=this.signupForm.value.userdata.prenom;
      this.user.date_naiss=this.signupForm.value.userdata.date_naiss;
      this.user.email=this.signupForm.value.userdata.email;
      this.user.telephone=this.signupForm.value.userdata.telephone;

      this.userr.date_naiss=this.signupForm.value.userdata.date_naiss;
      this.userr.nom_utilisateur=this.signupForm.value.userdata.nom;
      this.userr.prenom_utilisateur=this.signupForm.value.userdata.prenom;
      this.userr.email=this.signupForm.value.userdata.email;
      this.userr.telephone=this.signupForm.value.userdata.telephone;
      console.log(this.userr);

      this.utilisateurservice.AddUser(this.userr).subscribe({
        next:(data)=>{
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Utilisateur Ajouté Avec Succès',
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogModel.closeAll();
            this.router.navigateByUrl('/user');
          },error: (error: HttpErrorResponse) => {
            this.message=error;
            Swal.fire({
              icon: 'error',
              title: this.message.message
            })
          }
      });
  }

  
}
