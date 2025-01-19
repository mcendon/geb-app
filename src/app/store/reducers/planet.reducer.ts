import { createReducer, on } from '@ngrx/store';
import * as PlanetActions from '../actions/planet.actions';
import { Planet } from '../../core/services/interfaces/planet.interface';

export interface PlanetState {
  planet: Planet | null;
  loading: boolean;
  error: string | null;
}

export const initialState: PlanetState = {
  planet: null,
  loading: false,
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
    planet,
    error: null,
    loading: false,
  })),
  on(PlanetActions.fetchPlanetFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(PlanetActions.addPlanetCredits, (state, { credits }) => ({
    ...state,
    planet: {
      ...state.planet!,
      coinsAvailable: state?.planet?.credits! + credits,
    },
  })),
  on(PlanetActions.removePlanetCredits, (state, { credits }) => ({
    ...state,
    planet: {
      ...state.planet!,
      coinsAvailable: state?.planet?.credits! - credits,
    },
  })),
  on(PlanetActions.addPlanetEnergy, (state, { energy }) => ({
    ...state,
    planet: {
      ...state.planet!,
      coinsAvailable: state?.planet?.totalEnergy! + energy,
    },
  })),
  on(PlanetActions.removePlanetEnergy, (state, { energy }) => ({
    ...state,
    planet: {
      ...state.planet!,
      coinsAvailable: state?.planet?.totalEnergy! - energy,
    },
  }))
);
