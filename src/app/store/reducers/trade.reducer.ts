import { Action, createReducer, on } from '@ngrx/store';
import * as TradeActions from '../actions/trade.actions';
import { Trade } from '../../core/services/interfaces/trade.interface';

export interface TradeState {
  availableTrades: Trade[];
  planetTrades: Trade[];
  lastGlobalTrades: Trade[];
  error: string | null;
}

export const initialState: TradeState = {
  availableTrades: [],
  planetTrades: [],
  lastGlobalTrades: [],
  error: null,
};

export const tradeReducer = createReducer(
  initialState,
  on(TradeActions.getAvailableTradesSuccess, (state, { trades }) => ({
    ...state,
    availableTrades: trades,
  })),
  on(TradeActions.getAvailableTradesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(TradeActions.getPlanetHistoricTradesSuccess, (state, { trades }) => ({
    ...state,
    planetTrades: trades,
  })),
  on(TradeActions.getPlanetHistoricTradesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(TradeActions.buyEnergy, (state, { buyer, trade }) => ({
    ...state,
    availableTrades: state.availableTrades.filter((t) => t.id !== trade.id),
    planetTrades: [...state.planetTrades, trade],
  }))
);
