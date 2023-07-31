import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { GroupeComponent } from './component/Groupes/groupe/groupe.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainViewComponent } from './Kanban/main-view/main-view.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ScheduleModule, RecurrenceEditorModule,DayService,WeekService,WorkWeekService,MonthService,DragAndDropService,ResizeService,AgendaService,TimelineViewsService,TimelineMonthService } from '@syncfusion/ej2-angular-schedule';

import { CalendarComponent } from './component/calendar/calendar.component';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TranslateModule } from '@ngx-translate/core';
import { AddGroupeComponent } from './component/Groupes/add-groupe/add-groupe.component';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { EditeGroupeComponent } from './component/Groupes/edite-groupe/edite-groupe.component';
import { UtilisateurComponent } from './component/Utilisateur/utilisateur/utilisateur.component';
import { AddUtilisateurComponent } from './component/Utilisateur/add-utilisateur/add-utilisateur.component';
import { EditUtilisateurComponent } from './component/Utilisateur/edit-utilisateur/edit-utilisateur.component';
import { ProjetComponent } from './component/Projet/projet/projet.component';
import { AddProjectComponent } from './component/Projet/add-project/add-project.component';
import { EditProjectComponent } from './component/Projet/edit-project/edit-project.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainViewComponent,
    CalendarComponent,
    AddGroupeComponent,
    GroupeComponent,
    EditeGroupeComponent,
    UtilisateurComponent,
    AddUtilisateurComponent,
    EditUtilisateurComponent,
    ProjetComponent,
    AddProjectComponent,
    EditProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    DragDropModule,
    ScheduleModule, 
    RecurrenceEditorModule,
    TreeViewModule,
    DropDownListModule,
    DateTimePickerModule,
    HttpClientModule,
    FormsModule,
    GridModule,
    MatDialogModule,
    TranslateModule.forRoot(),
  ],
  providers: [DayService,WeekService,WorkWeekService,MonthService,DragAndDropService,ResizeService,AgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
