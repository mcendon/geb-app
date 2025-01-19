import { createAction, props } from '@ngrx/store';
import { Planet } from '../../core/services/interfaces/planet.interface';

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

export const addPlanetCredits = createAction(
  '[Planet] Add Credits',
  props<{ credits: number }>()
);

export const removePlanetCredits = createAction(
  '[Planet] Remove Credits',
  props<{ credits: number }>()
);

export const addPlanetEnergy = createAction(
  '[Planet] Add Energy',
  props<{ energy: number }>()
);

export const removePlanetEnergy = createAction(
  '[Planet] Remove Energy',
  props<{ energy: number }>()
);
