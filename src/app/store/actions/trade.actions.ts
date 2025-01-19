import { createAction, props } from '@ngrx/store';
import { Trade } from '../../core/services/interfaces/trade.interface';
import { Planet } from '../../core/services/interfaces/planet.interface';

// Get Available Trades
export const getAvailableTrades = createAction(
  '[Trade] Get Available Trades',
  props<{ planetId: number }>()
);

export const getAvailableTradesSuccess = createAction(
  '[Trade] Get Available Trades Success',
  props<{ trades: Trade[] }>()
);

export const getAvailableTradesFailure = createAction(
  '[Trade] Get Available Trades Failure',
  props<{ error: any }>()
);

// Buy Energy
export const buyEnergy = createAction(
  '[Trade] Buy Energy',
  props<{ buyer: Planet; trade: Trade }>()
);

export const buyEnergySuccess = createAction(
  '[Trade] Buy Energy Success',
  props<{ trade: Trade }>()
);

export const buyEnergyFailure = createAction(
  '[Trade] Buy Energy Failure',
  props<{ error: any }>()
);

// Sell Energy
export const sellEnergy = createAction(
  '[Trade] Sell Energy',
  props<{ tradeId: string; amount: number }>()
);

export const sellEnergySuccess = createAction(
  '[Trade] Sell Energy Success',
  props<{ trade: Trade }>()
);

export const sellEnergyFailure = createAction(
  '[Trade] Sell Energy Failure',
  props<{ error: any }>()
);

// Get All Historic Trades
export const getAllHistoricTrades = createAction(
  '[Trade] Get All Historic Trades'
);

export const getAllHistoricTradesSuccess = createAction(
  '[Trade] Get All Historic Trades Success',
  props<{ trades: Trade[] }>()
);

export const getAllHistoricTradesFailure = createAction(
  '[Trade] Get All Historic Trades Failure',
  props<{ error: any }>()
);

export const getPlanetHistoricTrades = createAction(
  '[Trade] Get Planet Historic Trades',
  props<{ planetId: number }>()
);

export const getPlanetHistoricTradesSuccess = createAction(
  '[Trade] Get Planet Historic Trades Success',
  props<{ trades: Trade[] }>()
);

export const getPlanetHistoricTradesFailure = createAction(
  '[Trade] Get Planet Historic Trades Failure',
  props<{ error: any }>()
);
