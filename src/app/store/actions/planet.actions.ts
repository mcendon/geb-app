import { createAction, props } from '@ngrx/store';
import { Planet } from '../../core/services/interfaces/planet.interface';
import { EnergyTrade } from '../../core/services/interfaces/energy-trade.interface';

export const fetchPlanet = createAction(
  '[Planet] Fetch Planet',
  props<{ planetId: number }>()
);

export const fetchPlanetSuccess = createAction(
  '[Planet] Fetch Planet Success',
  props<{ planet: Planet }>()
);

export const fetchPlanetFailure = createAction(
  '[Planet] Fetch Planet Failure',
  props<{ error: any }>()
);

export const fetchPlanetSales = createAction(
  '[Planet] Fetch Planet Sales',
  props<{ planetId: number }>()
);

export const fetchPlanetSalesSuccess = createAction(
  '[Planet] Fetch Planet Sales Success',
  props<{ sales: EnergyTrade[] }>()
);

export const fetchPlanetSalesFailure = createAction(
  '[Planet] Fetch Planet Sales Failure',
  props<{ error: any }>()
);

export const fetchPlanetPurchases = createAction(
  '[Planet] Fetch Planet Purchases',
  props<{ planetId: number }>()
);

export const fetchPlanetPurchasesSuccess = createAction(
  '[Planet] Fetch Planet Purchases Success',
  props<{ purchases: EnergyTrade[] }>()
);

export const fetchPlanetPurchasesFailure = createAction(
  '[Planet] Fetch Planet Purchases Failure',
  props<{ error: any }>()
);

// Buy Energy
export const addNewPurchase = createAction(
  '[Planet] Add new purchase',
  props<{ trade: EnergyTrade }>()
);

// Sell Energy
export const addNewSale = createAction(
  '[Planet] Add new sale',
  props<{ trade: EnergyTrade }>()
);

// Push trade coming from real-time server
export const pushPurchaseRealTime = createAction(
  '[Planet] Push new purchase real-time',
  props<{ trade: EnergyTrade }>()
);

// Push trade coming from real-time server
export const pushSaleRealTime = createAction(
  '[Planet] Push new sale real-time',
  props<{ trade: EnergyTrade }>()
);
