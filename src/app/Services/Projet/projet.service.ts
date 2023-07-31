import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/projet.models';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  url:string=environment.apiUrl;
  value:Number;
  private readonly api:string=`${this.url}/HPS/Project`;
  constructor(private http:HttpClient) { }

  GetProject():Observable<Project[]>{
    return this.http.get<Project[]>(this.api);
  }

  AddProject(projet:Project):Observable<Project>{
    return this.http.post<Project>(this.api,projet);
  }

  RemoveProject(id:Number):Observable<Object>{
    return this.http.delete<Object>(this.api+`/${id}`);
  }

  GetById(id:Number):Observable<Project>{
    return this.http.get<Project>(this.api+`/${id}`);
  }

  update(id:Number,projet:Project):Observable<Project>{
    return this.http.put<Project>(this.api+`/${id}`,projet);
  }

  GetCountProject():Observable<Number>{
    return this.http.get<Number>(this.api+'/getcount');
  }

  GetCountStartProject():Observable<Number>{
    return this.http.get<Number>(this.api+'/getstartproject');
  }
}
