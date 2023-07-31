import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Groupe } from 'src/app/models/groupe.models';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {
  url:string=environment.apiUrl;
  value:Number;

  private readonly api:string=`${this.url}/HPS/Groupe`;

  constructor(private http:HttpClient) { }

  GetAll(): Observable<Groupe[]>{
    return this.http.get<Groupe[]>(this.api);
  }

  GetCountUserInGroup(id:Number):Observable<Number>{
    return this.http.get<Number>(`${this.api}`+`/UserCount/${id}`)
  }

  AddGroup(group:Groupe):Observable<Groupe>{
    return this.http.post<Groupe>(this.api,group);
  }

  DeleteGroup(id:Number):Observable<Object>{
    return this.http.delete<Object>(`${this.api}`+`/${id}`)
  }

  GetById(id:Number):Observable<Groupe[]>{
    return this.http.get<Groupe[]>(`${this.api}`+`/finduser/${id}`);
  }

  UpdateGroup(id:Number,data:Groupe):Observable<Groupe>{
    return this.http.put<Groupe>(`${this.api}`+`/${id}`,data);
  }

}
