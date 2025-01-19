import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
import { Trade } from './interfaces/trade.interface';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  private readonly GALACTIC_ENERGY_PRICE = 10;

  constructor(private http: HttpClient) {}

  getEnergyPrice(): number {
    return this.GALACTIC_ENERGY_PRICE;
  }

  getTrades(): Observable<Trade[]> {
    return this.http.get<Trade[]>('api/trades');
  }

  getTradeById(id: string): Observable<Trade> {
    return this.http.get<Trade>(`api/trades/${id}`);
  }

  getTradesByPlanet(planetId: number): Observable<Trade[]> {
    return this.http
      .get<Trade[]>(`api/trades`)
      .pipe(
        map((trades: Trade[]) =>
          trades.filter(
            (trade) => trade.sellerId === planetId || trade.buyerId === planetId
          )
        )
      );
  }

  getAvailableTrades(planetId: number): Observable<Trade[]> {
    return this.http
      .get<Trade[]>('api/trades')
      .pipe(
        map((trades) =>
          trades.filter(
            (trade) => trade.sellerId !== planetId && trade.status === 'open'
          )
        )
      );
  }
}
