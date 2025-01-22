import { createAction, props } from '@ngrx/store';
import { EnergyTrade } from '../../core/services/interfaces/energy-trade.interface';
import { Planet } from '../../core/services/interfaces/planet.interface';

const FETCH_TRADES = '[Trade] Fetch Trades';
const FETCH_TRADES_SUCCESS = '[Trade] Fetch Trades Success';
const FETCH_TRADES_FAILURE = '[Trade] Fetch Trades Failure';
const PUSH_NEW_TRADE = '[Trade] Push New Trade';
const PUSH_NEW_TRADE_SUCCESS = '[Trade] Push New Trade Success';
const PUSH_NEW_TRADE_FAILURE = '[Trade] Push New Trade Failure';
const BUY_ENERGY = '[Trade] Buy Energy';
const BUY_ENERGY_SUCCESS = '[Trade] Buy Energy Success';
const BUY_ENERGY_FAILURE = '[Trade] Buy Energy Failure';
const SELL_ENERGY = '[Trade] Sell Energy';
const SELL_ENERGY_SUCCESS = '[Trade] Sell Energy Success';
const SELL_ENERGY_FAILURE = '[Trade] Sell Energy Failure';

export const fetchTrades = createAction(
  FETCH_TRADES,
  props<{ planetId: number }>()
);

export const fetchTradesSuccess = createAction(
  FETCH_TRADES_SUCCESS,
  props<{ trades: EnergyTrade[]; planetId: number }>()
);

export const fetchTradesFailure = createAction(
  FETCH_TRADES_FAILURE,
  props<{ error: any }>()
);

// Push New Available Trade (Real-time)
export const pushNewTrade = createAction(
  PUSH_NEW_TRADE,
  props<{ trade: EnergyTrade }>()
);

export const pushNewTradeSuccess = createAction(
  PUSH_NEW_TRADE_SUCCESS,
  props<{ trade: EnergyTrade }>()
);

export const pushNewTradeFailure = createAction(
  PUSH_NEW_TRADE_FAILURE,
  props<{ error: any }>()
);

// Buy Energy

export const buyEnergy = createAction(
  BUY_ENERGY,
  props<{ planet: Planet; trade: EnergyTrade }>()
);

export const buyEnergySuccess = createAction(
  BUY_ENERGY_SUCCESS,
  props<{ trade: EnergyTrade }>()
);

export const buyEnergyFailure = createAction(
  BUY_ENERGY_FAILURE,
  props<{ error: any }>()
);

export const sellEnergy = createAction(
  SELL_ENERGY,
  props<{ planet: Planet; energy: number }>()
);

export const sellEnergySuccess = createAction(
  SELL_ENERGY_SUCCESS,
  props<{ trade: EnergyTrade }>()
);

export const sellEnergyFailure = createAction(
  SELL_ENERGY_FAILURE,
  props<{ error: any }>()
);
