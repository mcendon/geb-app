import { EnergyTrade } from './energy-trade.interface';

export interface Planet {
  id: number;
  name: string;
  energy: number;
  money: number;
  sales: EnergyTrade[];
  purchases: EnergyTrade[];
}
