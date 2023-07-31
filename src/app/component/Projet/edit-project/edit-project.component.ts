import { HttpErrorResponse } from '@angular/common/http';
import { Component,ViewChild,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProjetService } from 'src/app/Services/Projet/projet.service';
import { Project } from 'src/app/models/projet.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  message:any;
  projcet=new Project();
  constructor( private dialogModel: MatDialog,private router: Router,private projetservice:ProjetService, private translate: TranslateService    ){}
  ngOnInit(): void {
      this.GeyById()
  }
  closeDialog(): void {
    this.dialogModel.closeAll();
  }

  projet={
    nomprojet:'',
    description:'',
    datedemarrage:null,
    datelivraison:null,
  }

  @ViewChild('f') signupForm:NgForm;
  onsubmit(){
    const delet='eventRemove';
    this.projcet.nomprojet=this.signupForm.value.projetdata.nomprojet;
    this.projcet.description=this.signupForm.value.projetdata.description;
    this.projcet.datedemarrage=this.signupForm.value.projetdata.datedemarrage;
    this.projcet.datelivraison=this.signupForm.value.projetdata.datelivraison;

    Swal.fire({
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: delet ? this.translate.instant('CONFIGURATION.PLANIFICATION.ACTIVATE') : this.translate.instant('CONFIGURATION.PLANIFICATION.DESACTIVATE'),
    }).then((result) => {
      if (result.isConfirmed) {
        this.projetservice.update(this.projetservice.value,new Project(this.projcet.nomprojet,this.projcet.description,this.projcet.datedemarrage, this.projcet.datelivraison)).subscribe({
          next: (response : any) => {
            console.log(this.projcet.nomprojet);
            Swal.fire({
              title: 'done!',
              icon: "success",
            })
            this.closeDialog();
            this.router.navigateByUrl('/Projet')
          },
          error: (error: HttpErrorResponse) => {
            console.log(error?.error.message || error?.message);
          }
        })
      }
    });
  }

  GeyById(){
    this.projetservice.GetById(this.projetservice.value).subscribe({
      next:(data)=>{
        this.projcet=data;
      }
    })
  }
}
