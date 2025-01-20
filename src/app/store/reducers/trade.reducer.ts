import { Action, createReducer, on } from '@ngrx/store';
import * as TradeActions from '../actions/trade.actions';
import { EnergyTrade } from '../../core/services/interfaces/energy-trade.interface';

export interface TradeState {
  trades: EnergyTrade[];
  loading: boolean;
  error: string | null;
}

export const initialState: TradeState = {
  trades: [],
  loading: false,
  error: null,
};

export const tradeReducer = createReducer(initialState);
