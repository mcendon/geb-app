import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planet } from './interfaces/planet.interface';

@Injectable({
  providedIn: 'root',
})
export class PlanetService {
  constructor(private http: HttpClient) {}

  getPlanets(): Observable<Planet[]> {
    return this.http.get<Planet[]>('api/planets');
  }

  getPlanet(id: number): Observable<Planet> {
    return this.http.get<Planet>(`api/planets/${id}`);
  }
}
