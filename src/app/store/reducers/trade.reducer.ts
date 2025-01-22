import { createReducer, on } from '@ngrx/store';
import { EnergyTrade } from '../../core/services/interfaces/energy-trade.interface';
import * as TradeActions from '../actions/trade.actions';

export interface TradeState {
  availableTrades: EnergyTrade[];
  trades: EnergyTrade[];
  loading: boolean;
  error: string;
}

export const initialState: TradeState = {
  availableTrades: [],
  trades: [],
  loading: false,
  error: null,
};

export const tradeReducer = createReducer(
  initialState,
  on(TradeActions.fetchTrades, (state) => ({
    ...state,
    loading: true,
  })),
  on(TradeActions.fetchTradesSuccess, (state, { trades, planetId }) => ({
    ...state,
    trades: [...trades],
    availableTrades: [
      ...trades.filter(
        (t) => t.status === 'new' && t.planetSellerId !== planetId
      ),
    ],
    loading: false,
  })),
  on(TradeActions.fetchTradesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(TradeActions.pushNewTrade, (state, { trade }) => ({
    ...state,
    trades: [...state.trades, trade],
  })),
  on(TradeActions.buyEnergy, (state) => ({
    ...state,
    loading: true,
  })),
  on(TradeActions.buyEnergySuccess, (state, { trade }) => ({
    ...state,
    availableTrades: [
      ...state.availableTrades.filter((t) => t.id !== trade.id),
    ],
    loading: false,
  })),
  on(TradeActions.buyEnergyFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(TradeActions.sellEnergy, (state) => ({
    ...state,
    loading: true,
  })),
  on(TradeActions.sellEnergySuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(TradeActions.sellEnergyFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
