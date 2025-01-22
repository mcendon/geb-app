import { createReducer, on } from '@ngrx/store';
import { GALACTIC_ENERGY_PRICE } from '../../core/constants';
import { EnergyTrade } from '../../core/services/interfaces/energy-trade.interface';
import * as PlanetActions from '../actions/planet.actions';

export interface PlanetState {
  planet: any;
  sales: EnergyTrade[];
  purchases: EnergyTrade[];
  loading: boolean;
  loadingSales: boolean;
  loadingPurchases: boolean;
  error: string;
}

export const initialState: PlanetState = {
  planet: null,
  sales: [],
  purchases: [],
  loading: false,
  loadingSales: false,
  loadingPurchases: false,
  error: null,
};

export const planetReducer = createReducer(
  initialState,
  on(PlanetActions.fetchPlanet, (state) => ({
    ...state,
    loading: true,
  })),
  on(PlanetActions.fetchPlanetSuccess, (state, { planet }) => ({
    ...state,
    planet: { ...planet },
    error: null,
    loading: false,
  })),
  on(PlanetActions.fetchPlanetFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(PlanetActions.fetchPlanetSales, (state) => ({
    ...state,
    loadingSales: true,
  })),
  on(PlanetActions.fetchPlanetSalesSuccess, (state, { sales }) => ({
    ...state,
    sales: [...sales],
    error: null,
    loadingSales: false,
  })),
  on(PlanetActions.fetchPlanetSalesFailure, (state, { error }) => ({
    ...state,
    error,
    loadingSales: false,
  })),
  on(PlanetActions.fetchPlanetPurchases, (state) => ({
    ...state,
    loadingPurchases: true,
  })),
  on(PlanetActions.fetchPlanetPurchasesSuccess, (state, { purchases }) => ({
    ...state,
    purchases: [...purchases],
    error: null,
    loadingPurchases: false,
  })),
  on(PlanetActions.fetchPlanetPurchasesFailure, (state, { error }) => ({
    ...state,
    error,
    loadingPurchases: false,
  })),
  on(PlanetActions.addNewPurchase, (state, { trade }) => ({
    ...state,
    loading: false,
    planet: {
      ...state.planet,
      money: state?.planet?.money! - trade.energy * GALACTIC_ENERGY_PRICE,
      energy: state?.planet?.energy! + trade.energy,
    },
    purchases: [
      ...state.purchases,
      {
        ...trade,
        status: 'completed',
        planetBuyerId: state.planet.id,
        planetBuyerName: state.planet.name,
      },
    ],
  })),
  on(PlanetActions.addNewSale, (state, { trade }) => ({
    ...state,
    planet: {
      ...state.planet!,
      energy: state?.planet?.energy! - trade.energy,
      money: state?.planet?.money! + trade.energy * GALACTIC_ENERGY_PRICE,
    },
    sales: [...state.sales, trade],
    loading: false,
  })),
  on(PlanetActions.pushPurchaseRealTime, (state, { trade }) => ({
    ...state,
    planet: {
      ...state.planet,
      money: state?.planet?.money! - trade.energy * GALACTIC_ENERGY_PRICE,
      energy: state?.planet?.energy! + trade.energy,
    },
    purchases: [
      ...state.purchases,
      {
        ...trade,
        status: trade.status,
        planetBuyerId: state.planet.id,
        planetBuyerName: state.planet.name,
      },
    ],
  })),
  on(PlanetActions.pushSaleRealTime, (state, { trade }) => ({
    ...state,
    planet: {
      ...state.planet!,
      energy: state?.planet?.energy! - trade.energy,
      money: state?.planet?.money! + trade.energy * GALACTIC_ENERGY_PRICE,
    },
    sales: [...state.sales, trade],
  }))
);
