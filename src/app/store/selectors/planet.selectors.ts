import { createSelector } from '@ngrx/store';
import { PlanetState } from '../reducers/planet.reducer';

export const selectPlanet = (state: { planet: PlanetState }) => state.planet;

export const selectPurchases = createSelector(
  selectPlanet,
  (state: PlanetState) => state.planet?.purchases
);

export const selectSales = createSelector(
  selectPlanet,
  (state: PlanetState) => state.planet?.sales
);
