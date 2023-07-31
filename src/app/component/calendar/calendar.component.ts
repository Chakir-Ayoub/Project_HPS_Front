import { Component, ViewChild,OnInit, Injectable, AfterViewChecked, AfterViewInit } from '@angular/core';
import { View,EventSettingsModel, DragEventArgs, ResizeEventArgs, CellClickEventArgs, ScheduleComponent, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import {  DragAndDropEventArgs } from '@syncfusion/ej2-angular-navigations';
import { L10n } from '@syncfusion/ej2-base';
import { PlanificationService } from 'src/app/Services/Planification/planification.service';
import { Planification } from 'src/app/models/Planification.models';
import { Calendar } from './calendar.models';
import { DatePipe } from '@angular/common';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { DataSourceChangedEventArgs, GridComponent, excelAggregateQueryCellInfo } from '@syncfusion/ej2-angular-grids';
import { ActionEventArgs } from '@syncfusion/ej2-schedule';
import { Session } from 'src/app/models/Session.models';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { UtilisateurService } from 'src/app/Services/Utilisateur/utilisateur.service';
import { Utilisateur } from 'src/app/models/utilisateur.models';
import { Colors } from 'chart.js';

L10n.load({
  'en-US':{
    'schedule':{
      'submitButton':'Add',
      'cancelButton':'Close',
      'deleteButton':'Remove',
      'newEvent':'Add Event'
    }
  }
})
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers:[DatePipe,TranslateService]
})
@Injectable()
export class CalendarComponent implements OnInit {
   cal:any[]=[];
   user:Utilisateur[]=[];
   public waitingList: { id: number, Name: string }[] = [
  ];
  public field: Object = { dataSource: this.waitingList, id: 'id', text: 'Name' };
  constructor(private planificationservice:PlanificationService,
              private router:Router,
              private translate: TranslateService,
              private userservice:UtilisateurService,
              ){ }


 GetAllUser() {
    this.userservice.GetAll().subscribe({
      next: (data: any[]) => {
        this.waitingList = data.map((item) => {
          return { id: item.idutilisateur, Name: item.nom_utilisateur };
        });
        this.field = { dataSource: this.waitingList, id: 'id', text: 'Name' };
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }
    public setview:View='Week';
    public setDate:Date=new Date();
    public statusFields:Object={text:'StatusText',value:'StatusText'}
    public StatusData:Object[]=[
      {StatusText:'New'},
      {StatusText:'Request'},
      {StatusText:'Confirmed'}
    ]
 
  ngOnInit(): void { 
    this.getPlanification();
    this.eventObject;
    this.GetAllUser();
  }
   message:any;
   Plan:Planification[]=[];  



   events: any[] = [];
   getPlanification() {
    this.planificationservice.GetAll().subscribe({
      next: (data) => { 
        data.forEach(element => {
          const cal = new Calendar;
          cal.PlanificationToCalender(element);
          const eventData  = {
            date:  cal.DatePlanification+"T"+cal.StartTime+'.000'+"Z",
            Subject: cal.Subject,
            StartTime: cal.DatePlanification+"T"+cal.StartTime+'.000'+"Z",
            EndTime: cal.DatePlanification+"T"+cal.EndTime+'.000'+"Z",
            Location: 'Casablanca'
          };
          this.events.push(eventData);
          this.eventObject.dataSource = [eventData];
        });
      }      
    });
  }
  public eventObject: EventSettingsModel={
    dataSource:this.events,
  }
public setViews: View[]=["Day","Week","WorkWeek","Agenda","TimelineMonth","TimelineDay"];

  onDragStart(args:DragEventArgs): void{
    args.interval=10;
    args.scroll.enable=false;
    args.excludeSelectors='e-all-day-cells';
  }
  onResizeStart(args:ResizeEventArgs):void{
    args.interval=10;
    args.scroll.enable=false;
  }
  @ViewChild('scheduleObj') public scheduleInstance: ScheduleComponent;
  onTreeDragStop(args: DragAndDropEventArgs):void{
    let cellData:CellClickEventArgs=this.scheduleInstance.getCellDetails(args.target);
    let eventdata:{[key:string]:object}={
      Id:args.draggedNodeData['id'],
      Subject:args.draggedNodeData['text'],
      StartTime:cellData.startTime,
      EndTime:cellData.endTime,
    };
    this.scheduleInstance.addEvent(eventdata);

    
  }


   Test:Calendar;
  public dataSourceChanged(args: ActionEventArgs ): void {
    
    if (args.requestType === 'eventCreate') {
      const cal =new Calendar(args);
      const newData=args.data[0]
      newData.StartTime  = new Date(newData.StartTime).toISOString();
      newData.EndTime = new Date(newData.EndTime).toISOString();
      newData.Subject=newData.Subject;
      
      this.planificationservice.AddPlanification(new Planification(newData.StartTime,new Session(newData.Subject,newData.StartTime. substring(11, 19),newData.EndTime. substring(11, 19)))).subscribe({
        next:(data)=>{
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Planification added successfully',
              showConfirmButton: false,
              timer: 1500
            })
            
          },error: (error: HttpErrorResponse) => {
            this.message=error;
            Swal.fire({
              icon: 'error',
              title: this.message.message
            })
          }
      });
    }
    else if (args.requestType === 'eventRemove') {
      const newData=args.data[0]
      newData.StartTime  = new Date(newData.StartTime).toISOString();
      const delet='eventRemove';

      Swal.fire({
        title: args.requestType ? 'eventRemove ?'  : ' ?',
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#3085d6",
        confirmButtonColor: "#d33",
        confirmButtonText: delet ? this.translate.instant('CONFIGURATION.PLANIFICATION.ACTIVATE') : this.translate.instant('CONFIGURATION.PLANIFICATION.DESACTIVATE'),
      }).then((result) => {
        if (result.isConfirmed) {
          this.planificationservice.RemovePlanification(newData.StartTime. substring(0, 10)).subscribe({
            next: (response : any) => {
              Swal.fire({
                title: 'done!',
                icon: "success",
              })
              this.router.navigateByUrl('/Calender')
            },
            error: (error: HttpErrorResponse) => {
              console.log(error?.error.message || error?.message);
            }
          })
        }
      });
    }
    else if(args.requestType==="eventChange"){
      console.log(args.data);
      const cla=new Calendar();
      const data=args.data && args.data.length>0?args.data[0]:null;
      const newData=args.data[0]
   
      for (const key in args.data) {
        if (args.data.hasOwnProperty(key)) {
          const value = args.data[key];
          if(key=="Subject"){
            cla.Subject=value;
          }
          else if(key=="date"){
            cla.DatePlanification=value;
          }
          else if(key=="StartTime"){
            cla.StartTime=new Date(value);

          }
          else if(key=="EndTime"){
            cla.EndTime=new Date(value);
          }
        }
      }

      const delet='eventEdit';


      Swal.fire({
        title: args.requestType ? 'eventEdit ?'  : ' ?',
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#3085d6",
        confirmButtonColor: "#d33",
        confirmButtonText: delet ? this.translate.instant('CONFIGURATION.PLANIFICATION.ACTIVATE') : this.translate.instant('CONFIGURATION.PLANIFICATION.DESACTIVATE'),
      }).then((result) => {
        if (result.isConfirmed) {;
         const Pla=new Planification();
         Pla.CalenderToPlanification(cla);
         const heurd:any=new Date(cla.StartTime)

         console.log(heurd.toTimeString().split(' ')[0]);

          this.planificationservice.UpdatePlanification(new Planification(cla.StartTime,new Session(cla.Subject,heurd.toTimeString().split(' ')[0],heurd.toTimeString().split(' ')[0])),cla.DatePlanification. substring(0, 10)).subscribe({
            next: (response : any) => {
              Swal.fire({
                title: 'done!',
                icon: "success",
              })
              this.router.navigateByUrl('/Calender')
            },
            error: (error: HttpErrorResponse) => {
              console.log(error?.error.message || error?.message);
            }
          })
        }
      });
    }
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    const popupElement = args.element as HTMLElement;

    const paragraph = document.createElement('p');
    paragraph.innerText = ''+args.name;
    popupElement.appendChild(paragraph);

    const button = document.createElement('button');
    button.innerText = 'Cliquez ici';

    button.classList.add('custom-button');

    button.addEventListener('click', () => {
        alert('Le bouton a été cliqué !');
    });

    // Ajoutez le bouton à l'élément du popup
    popupElement.appendChild(button);
  
}
}