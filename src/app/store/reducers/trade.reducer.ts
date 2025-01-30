import { createReducer, on } from '@ngrx/store';
import { EnergyTrade } from '../../core/services/interfaces/energy-trade.interface';
import * as TradeActions from '../actions/trade.actions';

export interface TradeState {
  trades: EnergyTrade[];
  loading: boolean;
  error: string;
}

export const initialState: TradeState = {
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
  on(TradeActions.fetchTradesSuccess, (state, { trades }) => ({
    ...state,
    trades: [...trades],
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
  on(TradeActions.buyEnergySuccess, (state, { trade }) => {
    let updatedTrades = [];
    const completedTrade = { ...trade, status: 'completed' };
    //check if the trade is in the trades array
    if (state.trades.find((t) => t.id === trade.id)) {
      //if it is, update the status
      updatedTrades = [
        ...state.trades.map((t) => (t.id === trade.id ? completedTrade : t)),
      ];
    } else {
      //if it's not, add it to the trades array
      updatedTrades = [...state.trades, completedTrade];
    }

    return {
      ...state,
      trades: updatedTrades,
      loading: false,
    };
  }),
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
