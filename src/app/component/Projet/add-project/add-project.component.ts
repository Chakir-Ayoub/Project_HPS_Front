import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjetService } from 'src/app/Services/Projet/projet.service';
import { Project } from 'src/app/models/projet.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  message:any;
  projcet=new Project();
  constructor( private dialogModel: MatDialog,private router: Router,private projetservice:ProjetService
    ){}

    projet={
      nomprojet:'',
      description:'',
      datedemarrage:null,
      datelivraison:null,
    }
    closeDialog(): void {
      this.dialogModel.closeAll();
    }
  
  
    @ViewChild('f') signupForm:NgForm;
    onsubmit(){
      this.projet.nomprojet=this.signupForm.value.projetdata.nomprojet;
      this.projet.description=this.signupForm.value.projetdata.description;
      this.projet.datedemarrage=this.signupForm.value.projetdata.datedemarrage;
      this.projet.datelivraison=this.signupForm.value.projetdata.datelivraison;



      this.projcet.nomprojet=this.projet.nomprojet;
      this.projcet.description=this.projet.description;
      this.projcet.datedemarrage=this.projet.datedemarrage;
      this.projcet.datelivraison=this.projet.datelivraison;


      this.projetservice.AddProject(this.projcet).subscribe({
        next:(data)=>{
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Utilisateur Ajouté Avec Succès',
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogModel.closeAll();
            this.router.navigateByUrl('/Projet');
          },error: (error: HttpErrorResponse) => {
            this.message=error;
            Swal.fire({
              icon: 'error',
              title: this.message.message
            })
          }
      });
  
     this.signupForm.reset(); 
    }
}
