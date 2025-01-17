import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../interfaces/user.interface';
import { Planet } from '../interfaces/planet.interface';
import { Language } from '../interfaces/language.interface';
import { Trade } from '../interfaces/trade.interface';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      planetId: 1,
      profiles: ['user', 'trader'],
      email: 'john.doe@example.com',
      preferredMode: 'light',
      password: 'password123',
    },
    {
      id: 2,
      name: 'Jane Smith',
      planetId: 2,
      profiles: ['user', 'trader-limited'],
      email: 'jane.smith@example.com',
      preferredMode: 'dark',
      password: 'password123',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      planetId: 3,
      profiles: ['user', 'trader-approver'],
      email: 'alice.johnson@example.com',
      preferredMode: 'light',
      password: 'password123',
    },
    {
      id: 4,
      name: 'Bob Brown',
      planetId: 1,
      profiles: ['user'],
      email: 'bob.brown@example.com',
      preferredMode: 'dark',
      password: 'password123',
    },
  ];

  planets: Planet[] = [
    {
      id: 1,
      name: 'Earth',
      availableEnergy: 1000,
      totalEnergy: 5000,
      coinsAvailable: 300,
    },
    {
      id: 2,
      name: 'Mars',
      availableEnergy: 800,
      totalEnergy: 4000,
      coinsAvailable: 200,
    },
    {
      id: 3,
      name: 'Venus',
      availableEnergy: 600,
      totalEnergy: 3000,
      coinsAvailable: 100,
    },
  ];

  languages: Language[] = [
    { id: 1, name: 'English' },
    { id: 2, name: 'Martian' },
    { id: 3, name: 'Venusian' },
  ];

  trades: Trade[] = [
    {
      id: 1,
      planetId: 1,
      createdBy: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      energyQty: 100,
      type: 'buy',
      status: 'open',
    },
    {
      id: 2,
      planetId: 2,
      createdBy: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      energyQty: 200,
      type: 'sell',
      status: 'closed',
    },
    {
      id: 3,
      planetId: 2,
      createdBy: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      energyQty: 150,
      type: 'buy',
      status: 'approval_pending',
    },
  ];

  createDb() {
    return {
      users: this.users,
      languages: this.languages,
      planets: this.planets,
      trades: this.trades,
    };
  }
}
