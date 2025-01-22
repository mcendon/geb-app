import { createAction, props } from '@ngrx/store';
import { EnergyTrade } from '../../core/services/interfaces/energy-trade.interface';
import { Planet } from '../../core/services/interfaces/planet.interface';

export const fetchTrades = createAction(
  '[Trade] Fetch Trades',
  props<{ planetId: number }>()
);

export const fetchTradesSuccess = createAction(
  '[Trade] Fetch Trades Success',
  props<{ trades: EnergyTrade[]; planetId: number }>()
);

export const fetchTradesFailure = createAction(
  '[Trade] Fetch Trades Failure',
  props<{ error: any }>()
);

// Push New Available Trade (Real-time)
export const pushNewTrade = createAction(
  '[Trade] Push New Trade',
  props<{ trade: EnergyTrade }>()
);

export const pushNewTradeSuccess = createAction(
  '[Trade] Push New Trade Success',
  props<{ trade: EnergyTrade }>()
);

export const pushNewTradeFailure = createAction(
  '[Trade] Push New Trade Failure',
  props<{ error: any }>()
);

// Buy Energy

export const buyEnergy = createAction(
  '[Trade] Buy Energy',
  props<{ planet: Planet; trade: EnergyTrade }>()
);

export const buyEnergySuccess = createAction(
  '[Trade] Buy Energy Success',
  props<{ trade: EnergyTrade }>()
);

export const buyEnergyFailure = createAction(
  '[Trade] Buy Energy Failure',
  props<{ error: any }>()
);

export const sellEnergy = createAction(
  '[Trade] Sell Energy',
  props<{ planet: Planet; energy: number }>()
);

export const sellEnergySuccess = createAction(
  '[Trade] Sell Energy Success',
  props<{ trade: EnergyTrade }>()
);

export const sellEnergyFailure = createAction(
  '[Trade] Sell Energy Failure',
  props<{ error: any }>()
);
