import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GroupeService } from 'src/app/Services/Groupe/groupe.service';
import { Groupe } from 'src/app/models/groupe.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-groupe',
  templateUrl: './add-groupe.component.html',
  styleUrls: ['./add-groupe.component.css']
})
export class AddGroupeComponent {

  constructor( private dialogModel: MatDialog,private groupeservice:GroupeService,    private router: Router,
    ){}
    group={
      nom:''
    }
    message:any;
    
  closeDialog(): void {
    this.dialogModel.closeAll();
  }


  @ViewChild('f') signupForm:NgForm;
  onsubmit(){
    this.group.nom=this.signupForm.value.groupdata.nom;
    this.groupeservice.AddGroup(new Groupe(1,this.group.nom)).subscribe({
      next:(data)=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Groupe added successfully',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogModel.closeAll();
          this.router.navigateByUrl('/Groupe');
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
