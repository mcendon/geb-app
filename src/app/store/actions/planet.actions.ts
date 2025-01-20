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

export const addPlanetMoney = createAction(
  '[Planet] Add Money',
  props<{ money: number }>()
);

export const decreasePlanetMoney = createAction(
  '[Planet] Decrease Money',
  props<{ money: number }>()
);

export const addPlanetEnergy = createAction(
  '[Planet] Add Energy',
  props<{ energy: number }>()
);

export const decreasePlanetEnergy = createAction(
  '[Planet] Decrease Energy',
  props<{ energy: number }>()
);
