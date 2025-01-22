import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { EnergyTrade } from '../interfaces/energy-trade.interface';
import { Language } from '../interfaces/language.interface';
import { Planet } from '../interfaces/planet.interface';
import { Session } from '../interfaces/session.interface';
import { User } from '../interfaces/user.interface';

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
      email: 'john.doe@earth.com',
      password: 'password123',
    },
    {
      id: 2,
      name: 'Jane Smith',
      planetId: 2,
      profiles: ['user', 'trader-limited'],
      email: 'jane.smith@mars.com',
      password: 'password123',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      planetId: 3,
      profiles: ['user', 'trader-approver'],
      email: 'alice.johnson@venus.com',
      password: 'password123',
    },
    {
      id: 4,
      name: 'Bob Brown',
      planetId: 1,
      profiles: ['user'],
      email: 'bob.brown@earth.com',
      password: 'password123',
    },
  ];

  planets: Planet[] = [
    {
      id: 1,
      name: 'Earth',
      energy: 1000,
      money: 5000,
    },
    {
      id: 2,
      name: 'Mars',
      energy: 800,
      money: 3000,
    },
    {
      id: 3,
      name: 'Ulthar',
      energy: 1200,
      money: 7000,
    },
  ];

  energyTrades: EnergyTrade[] = [
    {
      id: 1,
      planetSellerId: 1,
      planetSellerName: 'Earth',
      planetBuyerId: 2,
      planetBuyerName: 'Mars',
      energy: 100,
      status: 'pending',
    },
    {
      id: 2,
      planetSellerId: 2,
      planetSellerName: 'Mars',
      planetBuyerId: 3,
      planetBuyerName: 'Ulthar',
      energy: 200,
      status: 'completed',
    },
    {
      id: 3,
      planetSellerId: 3,
      planetSellerName: 'Ulthar',
      planetBuyerId: 1,
      planetBuyerName: 'Earth',
      energy: 300,
      status: 'completed',
    },
    {
      id: 4,
      planetSellerId: 1,
      planetSellerName: 'Earth',
      energy: 400,
      status: 'new',
    },
    {
      id: 5,
      planetSellerId: 2,
      planetSellerName: 'Mars',
      energy: 500,
      status: 'new',
    },
    {
      id: 6,
      planetSellerId: 3,
      planetSellerName: 'Ulthar',
      energy: 600,
      status: 'new',
    },
    {
      id: 7,
      planetSellerId: 1,
      planetSellerName: 'Earth',
      energy: 700,
      status: 'new',
    },
    {
      id: 8,
      planetSellerId: 2,
      planetSellerName: 'Mars',
      energy: 800,
      status: 'new',
    },
    {
      id: 9,
      planetSellerId: 3,
      planetSellerName: 'Ulthar',
      energy: 900,
      status: 'new',
    },
    {
      id: 10,
      planetSellerId: 1,
      planetSellerName: 'Earth',
      energy: 1000,
      status: 'new',
    },
    {
      id: 11,
      planetSellerId: 2,
      planetSellerName: 'Mars',
      energy: 1100,
      status: 'new',
    },
    {
      id: 12,
      planetSellerId: 3,
      planetSellerName: 'Ulthar',
      energy: 1200,
      status: 'new',
    },
    {
      id: 13,
      planetSellerId: 1,
      planetSellerName: 'Earth',
      energy: 1300,
      status: 'new',
    },
    {
      id: 14,
      planetSellerId: 2,
      planetSellerName: 'Mars',
      energy: 100,
      status: 'new',
    },
    {
      id: 15,
      planetSellerId: 3,
      planetSellerName: 'Ulthar',
      energy: 150,
      status: 'new',
    },
    {
      id: 16,
      planetSellerId: 1,
      planetSellerName: 'Earth',
      energy: 1600,
      status: 'new',
    },
    {
      id: 17,
      planetSellerId: 2,
      planetSellerName: 'Mars',
      energy: 170,
      status: 'new',
    },
    {
      id: 18,
      planetSellerId: 3,
      planetSellerName: 'Ulthar',
      energy: 1800,
      status: 'new',
    },
    {
      id: 19,
      planetSellerId: 1,
      planetSellerName: 'Earth',
      energy: 1900,
      status: 'new',
    },
    {
      id: 20,
      planetSellerId: 2,
      planetSellerName: 'Mars',
      energy: 200,
      status: 'new',
    },
    {
      id: 21,
      planetSellerId: 3,
      planetSellerName: 'Ulthar',
      energy: 2100,
      status: 'new',
    },
    {
      id: 22,
      planetSellerId: 1,
      planetSellerName: 'Earth',
      energy: 2200,
      status: 'new',
    },
    {
      id: 23,
      planetSellerId: 2,
      planetSellerName: 'Mars',
      energy: 230,
      status: 'new',
    },
    {
      id: 24,
      planetSellerId: 3,
      planetSellerName: 'Ulthar',
      energy: 2400,
      status: 'new',
    },
    {
      id: 25,
      planetSellerId: 1,
      planetSellerName: 'Earth',
      energy: 2500,
      status: 'new',
    },
    {
      id: 26,
      planetSellerId: 2,
      planetSellerName: 'Mars',
      energy: 2600,
      status: 'new',
    },
    {
      id: 27,
      planetSellerId: 3,
      planetSellerName: 'Ulthar',
      energy: 2700,
      status: 'new',
    },
    {
      id: 28,
      planetSellerId: 1,
      planetSellerName: 'Earth',
      energy: 2800,
      status: 'new',
    },
    {
      id: 29,
      planetSellerId: 2,
      planetSellerName: 'Mars',
      energy: 2900,
      status: 'new',
    },
    {
      id: 30,
      planetSellerId: 3,
      planetSellerName: 'Ulthar',
      energy: 3000,
      status: 'new',
    },
  ];

  languages: Language[] = [
    { id: 1, name: 'English' },
    { id: 2, name: 'Martian' },
    { id: 3, name: 'Venusian' },
  ];

  sessions: Session[] = [];

  createDb() {
    return {
      users: this.users,
      languages: this.languages,
      planets: this.planets,
      sessions: this.sessions,
      energyTrades: this.energyTrades,
    };
  }

  /**
   * Simulate creating a new session.
   * @param user
   * @returns
   */
  createSession(user: User): Session {
    const token = `${Math.random().toString(36).substring(2)}${Math.random()
      .toString(36)
      .substring(2)}`; // random token
    const session = {
      id: this.sessions.length + 1,
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 3600 * 1000), // 1 hour from now
    };
    this.sessions.push(session);
    return session;
  }

  /**
   * Simulate getting a session by token.
   * @param token
   * @returns
   */
  getSessionByToken(token: string): Session | undefined {
    //demo only, not secure
    return this.sessions.find(
      (session) => session.token === token && session.expiresAt > new Date()
    );
  }
}
