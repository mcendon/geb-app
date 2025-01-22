import { createAction, props } from '@ngrx/store';
import { Planet } from '../../core/services/interfaces/planet.interface';
import { EnergyTrade } from '../../core/services/interfaces/energy-trade.interface';

const FETCH_PLANET = '[Planet] Fetch Planet';
const FETCH_PLANET_SUCCESS = '[Planet] Fetch Planet Success';
const FETCH_PLANET_FAILURE = '[Planet] Fetch Planet Failure';
const FETCH_PLANET_SALES = '[Planet] Fetch Planet Sales';
const FETCH_PLANET_SALES_SUCCESS = '[Planet] Fetch Planet Sales Success';
const FETCH_PLANET_SALES_FAILURE = '[Planet] Fetch Planet Sales Failure';
const FETCH_PLANET_PURCHASES = '[Planet] Fetch Planet Purchases';
const FETCH_PLANET_PURCHASES_SUCCESS =
  '[Planet] Fetch Planet Purchases Success';
const FETCH_PLANET_PURCHASES_FAILURE =
  '[Planet] Fetch Planet Purchases Failure';
const ADD_NEW_PURCHASE = '[Planet] Add new purchase';
const ADD_NEW_SALE = '[Planet] Add new sale';
const PUSH_PURCHASE_REAL_TIME = '[Planet] Push new purchase real-time';
const PUSH_SALE_REAL_TIME = '[Planet] Push new sale real-time';

export const fetchPlanet = createAction(
  FETCH_PLANET,
  props<{ planetId: number }>()
);

export const fetchPlanetSuccess = createAction(
  FETCH_PLANET_SUCCESS,
  props<{ planet: Planet }>()
);

export const fetchPlanetFailure = createAction(
  FETCH_PLANET_FAILURE,
  props<{ error: any }>()
);

export const fetchPlanetSales = createAction(
  FETCH_PLANET_SALES,
  props<{ planetId: number }>()
);

export const fetchPlanetSalesSuccess = createAction(
  FETCH_PLANET_SALES_SUCCESS,
  props<{ sales: EnergyTrade[] }>()
);

export const fetchPlanetSalesFailure = createAction(
  FETCH_PLANET_SALES_FAILURE,
  props<{ error: any }>()
);

export const fetchPlanetPurchases = createAction(
  FETCH_PLANET_PURCHASES,
  props<{ planetId: number }>()
);

export const fetchPlanetPurchasesSuccess = createAction(
  FETCH_PLANET_PURCHASES_SUCCESS,
  props<{ purchases: EnergyTrade[] }>()
);

export const fetchPlanetPurchasesFailure = createAction(
  FETCH_PLANET_PURCHASES_FAILURE,
  props<{ error: any }>()
);

export const addNewPurchase = createAction(
  ADD_NEW_PURCHASE,
  props<{ trade: EnergyTrade }>()
);

export const addNewSale = createAction(
  ADD_NEW_SALE,
  props<{ trade: EnergyTrade }>()
);

export const pushPurchaseRealTime = createAction(
  PUSH_PURCHASE_REAL_TIME,
  props<{ trade: EnergyTrade }>()
);

export const pushSaleRealTime = createAction(
  PUSH_SALE_REAL_TIME,
  props<{ trade: EnergyTrade }>()
);
