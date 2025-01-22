import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { EnergyTrade } from './interfaces/energy-trade.interface';
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

  getPlanetSales(planetId: number): Observable<EnergyTrade[]> {
    return this.http
      .get<EnergyTrade[]>(`api/energyTrades/?planetSellerId=${planetId}`)
      .pipe(delay(2000));
  }

  getPlanetPurchases(planetId: number): Observable<EnergyTrade[]> {
    return this.http
      .get<EnergyTrade[]>(`api/energyTrades/?planetBuyerId=${planetId}`)
      .pipe(delay(1000));
  }
}
