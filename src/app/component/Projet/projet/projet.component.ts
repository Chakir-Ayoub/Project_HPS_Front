import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjetService } from 'src/app/Services/Projet/projet.service';
import { Project } from 'src/app/models/projet.models';
import { AddProjectComponent } from '../add-project/add-project.component';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { Route, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EditProjectComponent } from '../edit-project/edit-project.component';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent  implements OnInit {
  
  constructor(private projetservice:ProjetService,private dialog: MatDialog,private translate: TranslateService,private router:Router){}
  ngOnInit(): void {
    this.getAllProject();
  }
  projet:Project[]=[];
  getAllProject(){
    this.projetservice.GetProject().subscribe({
      next:(data)=>{
        console.log(data);
        this.projet=data;
      }
    })
  }



  addNew() {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: "50%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllProject();
      console.log(`Dialog result: ${result}`);
    });
  }

  Delete(id:Number){
    const delet='eventRemove';

    Swal.fire({
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: delet ? this.translate.instant('CONFIGURATION.PLANIFICATION.ACTIVATE') : this.translate.instant('CONFIGURATION.PLANIFICATION.DESACTIVATE'),
    }).then((result) => {
      if (result.isConfirmed) {
        this.projetservice.RemoveProject(id).subscribe({
          next: (response : any) => {
            Swal.fire({
              title: 'done!',
              icon: "success",
            })
            this.getAllProject();
            this.router.navigateByUrl('/Projet')
          },
          error: (error: HttpErrorResponse) => {
            console.log(error?.error.message || error?.message);
          }
        })
      }
    });
  }
  
  Edite(id:Number){
    this.projetservice.value=id;
    const dialogRef = this.dialog.open(EditProjectComponent, {
      width: "50%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllProject();
      console.log(`Dialog result: ${result}`);
    });
  }
}
