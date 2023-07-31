import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupeComponent } from './component/Groupes/groupe/groupe.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { MainViewComponent } from './Kanban/main-view/main-view.component';
import { CalendarComponent } from './component/calendar/calendar.component';
import { EditeGroupeComponent } from './component/Groupes/edite-groupe/edite-groupe.component';
import { UtilisateurComponent } from './component/Utilisateur/utilisateur/utilisateur.component';
import { ProjetComponent } from './component/Projet/projet/projet.component';

const route:Routes=[
  {path:'',component:SidebarComponent},
  {path:'Kanban',component:MainViewComponent},
  {path:'Groupe',component:GroupeComponent},
  {path:'Calender',component:CalendarComponent},
  {path:'user',component:UtilisateurComponent},
  {path:'Projet',component:ProjetComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(route)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
