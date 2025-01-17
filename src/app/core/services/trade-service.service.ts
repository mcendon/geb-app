import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trade } from './interfaces/trade.interface';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  constructor(private http: HttpClient) {}

  getTrades(): Observable<Trade[]> {
    return this.http.get<Trade[]>('api/trades');
  }

  getTradeById(id: string): Observable<Trade> {
    return this.http.get<Trade>(`api/trades/${id}`);
  }

  getTradesByUser(userId: number): Observable<Trade[]> {
    return this.http.get<Trade[]>(`api/trades/?createdBy=${userId}`);
  }

  getTradesByPlanet(planetId: number): Observable<Trade[]> {
    return this.http.get<Trade[]>(`api/trades/planet?planetId=${planetId}`);
  }
}
