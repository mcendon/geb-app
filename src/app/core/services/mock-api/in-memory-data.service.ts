import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../interfaces/user.interface';
import { Planet } from '../interfaces/planet.interface';
import { Language } from '../interfaces/language.interface';
import { Trade } from '../interfaces/trade.interface';
import { Session } from '../interfaces/session.interface';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  users: User[] = [
    {
      id: 1,
      name: 'Earth',
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
      availableEnergy: 1000,
      totalEnergy: 5000,
      credits: 1000,
    },
    {
      id: 2,
      name: 'Mars',
      availableEnergy: 800,
      totalEnergy: 4000,
      credits: 1000,
    },
    {
      id: 3,
      name: 'Venus',
      availableEnergy: 600,
      totalEnergy: 3000,
      credits: 1000,
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
      sellerId: 1,
      buyerId: null,
      createdBy: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      energyQty: 100,
      type: 'buy',
      status: 'open',
      sellerName: 'Earth',
      buyerName: null,
    },
    {
      id: 2,
      sellerId: 1,
      buyerId: null,
      createdBy: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      energyQty: 100,
      type: 'buy',
      status: 'open',
      sellerName: 'Earth',
      buyerName: null,
    },
    {
      id: 3,
      sellerId: 2,
      buyerId: 1,
      createdBy: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      energyQty: 200,
      type: 'sell',
      status: 'closed',
      sellerName: 'Mars',
      buyerName: 'Earth',
    },
    {
      id: 4,
      sellerId: 2,
      buyerId: 1,
      createdBy: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      energyQty: 150,
      type: 'buy',
      status: 'approval_pending',
      sellerName: 'Mars',
      buyerName: 'Earth',
    },
    {
      id: 5,
      sellerId: 2,
      buyerId: null,
      createdBy: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      energyQty: 150,
      type: 'buy',
      status: 'open',
      sellerName: 'Mars',
      buyerName: '',
    },
    {
      id: 6,
      sellerId: 3,
      buyerId: null,
      createdBy: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      energyQty: 50,
      type: 'buy',
      status: 'open',
      sellerName: 'Venus',
      buyerName: '',
    },
  ];

  sessions: Session[] = [];

  createDb() {
    return {
      users: this.users,
      languages: this.languages,
      planets: this.planets,
      trades: this.trades,
      sessions: this.sessions,
    };
  }

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

  getSessionByToken(token: string): Session | undefined {
    //demo only, not secure
    return this.sessions.find(
      (session) => session.token === token && session.expiresAt > new Date()
    );
  }
}
