import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { EnergyTrade } from './interfaces/energy-trade.interface';
import { InMemoryDataService } from './mock-api/in-memory-data.service';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  constructor(
    private http: HttpClient,
    private inMemoryDataService: InMemoryDataService
  ) {}

  getAvailableTradesForPlanet(planetId: number): Observable<EnergyTrade[]> {
    return of(
      this.inMemoryDataService.energyTrades.filter(
        (t) => t.status === 'new' && t.planetSellerId !== planetId
      )
    ).pipe(delay(2000));
  }

  getAllTrades(): Observable<EnergyTrade[]> {
    return this.http.get<EnergyTrade[]>('api/energyTrades').pipe(delay(3000));
  }

  // Other methods: buyEnergy, sellEnergy, etc.
}
