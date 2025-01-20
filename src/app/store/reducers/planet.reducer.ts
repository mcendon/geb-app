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
  on(PlanetActions.addPlanetMoney, (state, { money }) => ({
    ...state,
    planet: {
      ...state.planet!,
      coinsAvailable: state?.planet?.money! + money,
    },
  })),
  on(PlanetActions.decreasePlanetMoney, (state, { money }) => ({
    ...state,
    planet: {
      ...state.planet!,
      coinsAvailable: state?.planet?.money! - money,
    },
  })),
  on(PlanetActions.addPlanetEnergy, (state, { energy }) => ({
    ...state,
    planet: {
      ...state.planet!,
      coinsAvailable: state?.planet?.energy! + energy,
    },
  })),
  on(PlanetActions.decreasePlanetEnergy, (state, { energy }) => ({
    ...state,
    planet: {
      ...state.planet!,
      coinsAvailable: state?.planet?.energy! - energy,
    },
  }))
);
