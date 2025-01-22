import { createSelector } from '@ngrx/store';
import { PlanetState } from '../reducers/planet.reducer';

export const selectPlanetState = (state: { planet: PlanetState }) =>
  state.planet;

export const isLoading = createSelector(
  selectPlanetState,
  (state: PlanetState) => state.loading
);

export const isLoadingSales = createSelector(
  selectPlanetState,
  (state: PlanetState) => state.loadingSales
);

export const isLoadingPurchases = createSelector(
  selectPlanetState,
  (state: PlanetState) => state.loadingPurchases
);

export const selectPlanet = createSelector(
  selectPlanetState,
  (state: PlanetState) => state.planet
);

export const selectPurchases = createSelector(
  selectPlanetState,
  (state: PlanetState) => state.purchases
);

export const selectSales = createSelector(
  selectPlanetState,
  (state: PlanetState) => state.sales
);

export const selectId = createSelector(
  selectPlanetState,
  (state: PlanetState) => state.planet?.id
);

export const selectName = createSelector(
  selectPlanetState,
  (state: PlanetState) => state.planet?.name
);

export const selectEnergy = createSelector(
  selectPlanetState,
  (state: PlanetState) => state.planet?.energy
);

export const selectMoney = createSelector(
  selectPlanetState,
  (state: PlanetState) => state.planet?.money
);
