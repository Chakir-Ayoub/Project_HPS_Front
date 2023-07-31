import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component,OnChanges,OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupeService } from 'src/app/Services/Groupe/groupe.service';
import { PlanificationService } from 'src/app/Services/Planification/planification.service';
import { Groupe } from 'src/app/models/groupe.models';
import { environment } from 'src/environments/environment.prod';
import { AddGroupeComponent } from '../add-groupe/add-groupe.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { EditeGroupeComponent } from '../edite-groupe/edite-groupe.component';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit  {
  url:string=environment.apiUrl;

  private readonly api:string=`${this.url}/HPS/Groupe`;
  constructor(private groupeservice:GroupeService,private http:HttpClient,private dialog: MatDialog,private translate: TranslateService,  private router: Router
    ){}

  group:Groupe[]=[];
  num:Number;
  ngOnInit(): void {
    this.GetALLGroupe();
  }

  GetALLGroupe(){
    this.groupeservice.GetAll().subscribe({
      next:(data)=>{
        this.group=data
        data.forEach(el=>{
         this.GetCountUserInGroup(el.idgroup).subscribe({
          next:(dat)=>{
            el.numuser=dat;
            console.log(this.num);
          }
         })
        })
      }
    })
  }

  GetCountUserInGroup(id:Number):Observable<Number>{
    return this.http.get<Number>(`${this.api}`+`/UserCount/${id}`)
  }

  addNew() {
    const dialogRef = this.dialog.open(AddGroupeComponent, {
      width: "50%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.GetALLGroupe();
      console.log(`Dialog result: ${result}`);
    });
  }

  Edite(id:Number){
    this.groupeservice.value=id;
    const dialogRef = this.dialog.open(EditeGroupeComponent, {
      width: "50%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.GetALLGroupe();
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
        this.groupeservice.DeleteGroup(id).subscribe({
          next: (response : any) => {
            Swal.fire({
              title: 'done!',
              icon: "success",
            })
            this.GetALLGroupe();
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
