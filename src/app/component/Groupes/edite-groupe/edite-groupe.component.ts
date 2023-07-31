import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { error } from 'jquery';
import { GroupeService } from 'src/app/Services/Groupe/groupe.service';
import { Groupe } from 'src/app/models/groupe.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edite-groupe',
  templateUrl: './edite-groupe.component.html',
  styleUrls: ['./edite-groupe.component.css']
})
export class EditeGroupeComponent implements OnInit {
  groupeForm:FormGroup;
  groupe:Groupe;
  constructor(
    private dialogModel: MatDialog,
    private groupeservice:GroupeService,
    private router: Router,
    private _fb:FormBuilder,
    private translate: TranslateService,

    ){}
    group={
      nom:''
    }
  ngOnInit(): void {
    this.groupeservice.GetById(this.groupeservice.value).subscribe((data:any)=>{
      this.groupe=data;
    },(error:any)=>{
      console.log(error);
    })
  }

    message:any;
  closeDialog(): void {
    this.dialogModel.closeAll();
  }


  @ViewChild('f') signupForm:NgForm;
  Update(){
    const delet='eventRemove';
    this.group.nom=this.signupForm.value.groupdata.nom;
    Swal.fire({
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: delet ? this.translate.instant('CONFIGURATION.PLANIFICATION.ACTIVATE') : this.translate.instant('CONFIGURATION.PLANIFICATION.DESACTIVATE'),
    }).then((result) => {
      if (result.isConfirmed) {
        this.groupeservice.UpdateGroup(this.groupeservice.value,new Groupe(this.groupeservice.value,this.group.nom)).subscribe({
          next: (response : any) => {
            console.log(this.group.nom);
            Swal.fire({
              title: 'done!',
              icon: "success",
            })
            this.closeDialog();
            this.router.navigateByUrl('/Groupe')
          },
          error: (error: HttpErrorResponse) => {
            console.log(error?.error.message || error?.message);
          }
        })
      }
    });
  }
}
