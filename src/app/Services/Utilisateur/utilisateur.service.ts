import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from 'src/app/models/utilisateur.models';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  url:string=environment.apiUrl;
  value:any;
  private readonly api:string=`${this.url}/HPS/Utilisateur`;
  constructor(private http:HttpClient) { }

  GetAll():Observable<Utilisateur[]>{return this.http.get<Utilisateur[]>(this.api);}
  AddUser(User:Utilisateur):Observable<Utilisateur>{
    return this.http.post<any>(this.api,User);
  }
  DelleteUser(id:Number):Observable<Object>{
    return this.http.delete<Object>(`${this.api}`+`/${id}`);
  }
  GetById(id:Number):Observable<Utilisateur>{
    return this.http.get<Utilisateur>(`${this.api}`+`/${id}`);
  }
  updateuser(id:Number,user:Utilisateur):Observable<Utilisateur>{
    return this.http.put<Utilisateur>(`${this.api}`+`/${id}`,user);
  }
  GetAbsenceNonJustifier(id:Number):Observable<Number>{
    return this.http.get<Number>(`${this.api}`+`/absenceNonJ/${id}`);
  }
  GetAbsencJustifier(id:Number):Observable<Number>{
    return this.http.get<Number>(`${this.api}`+`/absenceJ/${id}`);
  }
  GetCountUser():Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>(this.api+'/GetCount');
  }
  GetCountAbsence():Observable<Number>{
    return this.http.get<Number>(this.api+'/GetCountAbsence');
  }
}
