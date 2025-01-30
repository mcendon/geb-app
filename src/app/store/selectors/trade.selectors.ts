import { createSelector } from '@ngrx/store';
import { TradeState } from '../reducers/trade.reducer';

export const selectTradeState = (state: { trade: TradeState }) => state.trade;

export const selectTrades = createSelector(
  selectTradeState,
  (state: TradeState) => {
    return state.trades;
  }
);

export const selectTradeLoading = createSelector(
  selectTradeState,
  (state: TradeState) => {
    return state.loading;
  }
);
