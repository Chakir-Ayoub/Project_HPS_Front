import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UtilisateurService } from 'src/app/Services/Utilisateur/utilisateur.service';
import { Utilisateur } from 'src/app/models/utilisateur.models';
import { AddUtilisateurComponent } from '../add-utilisateur/add-utilisateur.component';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { EditUtilisateurComponent } from '../edit-utilisateur/edit-utilisateur.component';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  user:Utilisateur[]=[];

  constructor(private utilisaturservice:UtilisateurService,private dialog: MatDialog,private translate: TranslateService,  private router: Router){}
  ngOnInit(): void {
    this.getAllUtilisateur();
  }

  getAllUtilisateur(){
    this.utilisaturservice.GetAll().subscribe({
      next:(data)=>{
        this.user=data;
        data.forEach(el=>{
          this.utilisaturservice.GetAbsenceNonJustifier(el.idutilisateur).subscribe({
            next:(dat)=>{
              el.numAbsencesnonJustifier=dat;
            }
          })
        })
        data.forEach(el=>{
          this.utilisaturservice.GetAbsencJustifier(el.idutilisateur).subscribe({
            next:(dat2)=>{
              el.numAbsencesJustifier=dat2;
            }
          })
        })
      }
    })
  }

  addNew() {
    const dialogRef = this.dialog.open(AddUtilisateurComponent, {
      width: "50%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUtilisateur();
      console.log(`Dialog result: ${result}`);
    });
  }

  Remove(id:Number){
    const delet='eventRemove';

    Swal.fire({
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: delet ? this.translate.instant('CONFIGURATION.PLANIFICATION.ACTIVATE') : this.translate.instant('CONFIGURATION.PLANIFICATION.DESACTIVATE'),
    }).then((result) => {
      if (result.isConfirmed) {
        this.utilisaturservice.DelleteUser(id).subscribe({
          next: (response : any) => {
            Swal.fire({
              title: 'done!',
              icon: "success",
            })
            this.getAllUtilisateur();
            this.router.navigateByUrl('/user')
          },
          error: (error: HttpErrorResponse) => {
            console.log(error?.error.message || error?.message);
          }
        })
      }
    });
  }
  Edite(id:Number){
    this.utilisaturservice.value=id;
    const dialogRef = this.dialog.open(EditUtilisateurComponent, {
      width: "50%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUtilisateur();
      console.log(`Dialog result: ${result}`);
    });
  }
}
