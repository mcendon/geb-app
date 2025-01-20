import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TradeService } from '../../core/services/trade-service.service';
import * as TradeActions from '../actions/trade.actions';
import * as PlanetActions from '../actions/planet.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TradeEffects {
  private readonly actions$ = inject(Actions);
  private readonly tradeService = inject(TradeService);
}
