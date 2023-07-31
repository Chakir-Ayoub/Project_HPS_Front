import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ProjetService } from 'src/app/Services/Projet/projet.service';
import { UtilisateurService } from 'src/app/Services/Utilisateur/utilisateur.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef,private user:UtilisateurService,private project:ProjetService) {}
  value:any;
  value2:any;
  value3:any;
  value4:any;
  ngOnInit(): void {
    // const nav = this.el.nativeElement.querySelector('.nav');
    // const nav2 = this.el.nativeElement.querySelector('.nav2');
    // const mySidenav = this.el.nativeElement.querySelector('#mySidenav');
    // const main = this.el.nativeElement.querySelector('#main');
    // const logo = this.el.nativeElement.querySelector('.logo');
    // const logoSpan = this.el.nativeElement.querySelector('.logo span');
    // const iconA = this.el.nativeElement.querySelector('.icon-a');
    // const icons = this.el.nativeElement.querySelector('.icons');

    // nav.addEventListener('click', () => {
    //   this.renderer.setStyle(mySidenav, 'width', '70px');
    //   this.renderer.setStyle(main, 'margin-left', '70px');
    //   this.renderer.setStyle(logo, 'visibility', 'hidden');
    //   this.renderer.setStyle(logoSpan, 'visibility', 'visible');
    //   this.renderer.setStyle(logoSpan, 'margin-left', '-10px');
    //   this.renderer.setStyle(iconA, 'visibility', 'hidden');
    //   this.renderer.setStyle(icons, 'visibility', 'visible');
    //   this.renderer.setStyle(icons, 'margin-left', '-8px');
    //   this.renderer.setStyle(nav, 'display', 'none');
    //   this.renderer.setStyle(nav2, 'display', 'block');
    // });

    // nav2.addEventListener('click', () => {
    //   this.renderer.setStyle(mySidenav, 'width', '300px');
    //   this.renderer.setStyle(main, 'margin-left', '300px');
    //   this.renderer.setStyle(logo, 'visibility', 'visible');
    //   this.renderer.setStyle(iconA, 'visibility', 'visible');
    //   this.renderer.setStyle(icons, 'visibility', 'visible');
    //   this.renderer.setStyle(nav, 'display', 'block');
    //   this.renderer.setStyle(nav2, 'display', 'none');
    // });

    this.GetCountUser();
    this.GetCountProject();
    this.GetCountAbsence();
    this.GetCountStartProject();
  }


  GetCountUser(){
    this.user.GetCountUser().subscribe({
      next:(data)=>{
        this.value= data;
      }
    })
  }

  GetCountProject(){
    this.project.GetCountProject().subscribe({
      next:(data)=>{
        this.value2=data;
      }
    })
  }

  GetCountAbsence(){
    this.user.GetCountAbsence().subscribe({
      next:(data)=>{
        this.value3=data;
      }
    })
  }

  GetCountStartProject(){
    this.project.GetCountStartProject().subscribe({
      next:(data)=>{
        console.log(data);
        this.value4=data;
      }
    })
  }

}
