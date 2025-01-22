import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnergyTrade } from './interfaces/energy-trade.interface';
import { InMemoryDataService } from './mock-api/in-memory-data.service';

/**
 * This service is intended to mockup a realtime database service.
 * In real-world use cases, you would use Firebase Realtime Database or WebSockets
 */
@Injectable({ providedIn: 'root' })
export class RealtimeDatabaseSimulatorService {
  private lastId = 500;
  private readonly MIN_INTERVAL = 1000;
  private readonly MAX_INTERVAL = 2000;

  constructor(private database: InMemoryDataService) {}

  private simulateIncomingTrades(): Observable<EnergyTrade> {
    return new Observable((observer) => {
      setInterval(() => {
        const randomTrade = this.createNewRandomTrade();
        observer.next(randomTrade);
      }, this.MIN_INTERVAL + Math.random() * this.MAX_INTERVAL);
    });
  }

  private randomizeSellerAndBuyer(): { sellerId: number; buyerId: number } {
    const max = this.database.planets.length;
    const sellerId = Math.floor(Math.random() * max) + 1;
    let buyerId = Math.floor(Math.random() * max) + 1;
    while (buyerId === sellerId) {
      buyerId = Math.floor(Math.random() * max) + 1;
    }
    return { sellerId, buyerId };
  }

  createNewRandomTrade(): EnergyTrade {
    const { sellerId: planetSellerId, buyerId: planetBuyerId } =
      this.randomizeSellerAndBuyer();

    const randomEnergyAmount = Math.floor(Math.random() * 100);
    const randomStatus =
      Math.floor(Math.random() * 100) < 50 ? 'new' : 'completed';
    // const randomPrice = Math.floor(Math.random() * 100) + 1;
    const randomTrade: EnergyTrade = {
      id: this.lastId++,
      planetSellerId,
      planetSellerName: this.database.planets.find(
        (p) => p.id === planetSellerId
      ).name,
      planetBuyerId: randomStatus === 'new' ? null : planetBuyerId,
      planetBuyerName:
        randomStatus === 'new'
          ? null
          : this.database.planets.find((p) => p.id == planetBuyerId).name,
      energy: randomEnergyAmount,
      status: randomStatus,
    };
    return randomTrade;
  }

  pullIncomingTrades(): Observable<EnergyTrade> {
    return this.simulateIncomingTrades();
  }
}
