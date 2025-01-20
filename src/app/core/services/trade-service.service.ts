import { Injectable } from '@angular/core';
import { GALACTIC_ENERGY_PRICE } from '../constants';
import { EnergyTrade } from './interfaces/energy-trade.interface';
import { InMemoryDataService } from './mock-api/in-memory-data.service';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  constructor(private inMemoryDataService: InMemoryDataService) {}

  /**
   * Mock method to buy energy
   * @param param0
   */
  buyEnergy({
    tradeId,
    planetId,
    energy,
  }: {
    tradeId: number;
    planetId: number;
    energy: number;
  }): void {
    // In a real application, this would be a POST request to the server
    // In this case, we are just updating the in-memory data

    const planet = this.inMemoryDataService.planets.find(
      (p) => p.id === planetId
    );
    const trade = this.inMemoryDataService.energyTrades.find(
      (t) => t.id === tradeId
    );

    if (!planet || !trade) {
      throw new Error('Planet or trade not found');
    }

    // update the trade as completed and assign the buyer
    trade.status = 'completed';
    trade.planetBuyerId = planetId;

    // update the planet
    planet.energy += energy;
    planet.money -= GALACTIC_ENERGY_PRICE * energy;
    planet.purchases.push(trade);
  }

  /**
   * Mock method to sell energy
   * @param planetId
   * @param energy
   */
  sellEnergy({ planetId, energy }: { planetId: number; energy: number }): void {
    // In a real application, this would be a POST request to the server
    // In this case, we are just updating the in-memory data

    const planet = this.inMemoryDataService.planets.find(
      (p) => p.id === planetId
    );

    if (!planet) {
      throw new Error('Planet not found');
    }

    const newTradeEnergy: EnergyTrade = {
      id: this.inMemoryDataService.energyTrades.length + 1,
      energy,
      status: 'new',
      planetSellerId: planetId,
      planetSellerName: planet.name,
    };

    // update the planet available energy
    planet.energy -= energy;

    this.inMemoryDataService.addEnergyTrade(newTradeEnergy);
  }
}
