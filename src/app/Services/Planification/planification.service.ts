import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Planification } from 'src/app/models/Planification.models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { event, map } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class PlanificationService {
  url:string=environment.apiUrl;

  private readonly api:string=`${this.url}/HPS/Planification`;

  constructor(private http:HttpClient) { }

  GetAll(): Observable<Planification[]>{
      return this.http.get<Planification[]>(this.api);
  }
  AddPlanification(planification:Planification): Observable<Planification>{
    return this.http.post<Planification>(this.api,planification);
  }
  RemovePlanification(date:any):Observable<Object>{
    return this.http.delete(`${this.api}`+`/${date}`);
  }

  UpdatePlanification(planifiction:Planification,date:any):Observable<Planification>{
    const Plan=`${this.api}`+`/${date}`;
    return this.http.put<Planification>(Plan,planifiction);
  }
}
