import { createAction, props } from '@ngrx/store';
import { EnergyTrade } from '../../core/services/interfaces/energy-trade.interface';
import { Planet } from '../../core/services/interfaces/planet.interface';

// Buy Energy
export const buyEnergy = createAction(
  '[Trade] Buy Energy',
  props<{ buyer: Planet; trade: EnergyTrade }>()
);

export const buyEnergySuccess = createAction(
  '[Trade] Buy Energy Success',
  props<{ trade: EnergyTrade }>()
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
  props<{ trade: EnergyTrade }>()
);

export const sellEnergyFailure = createAction(
  '[Trade] Sell Energy Failure',
  props<{ error: any }>()
);
