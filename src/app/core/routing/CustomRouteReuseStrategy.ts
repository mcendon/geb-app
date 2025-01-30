import {
  ActivatedRouteSnapshot,
  BaseRouteReuseStrategy,
  DetachedRouteHandle,
} from '@angular/router';

/**
 * Custom route reuse strategy to avoid destroying and recreating components
 * when navigating between routes.
 */
export class CustomRouteReuseStrategy extends BaseRouteReuseStrategy {
  private storedRoutes: { [key: string]: DetachedRouteHandle } = {};

  override shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.data && route.data['reuse'];
  }

  override store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle | null
  ): void {
    if (route.data && route.data['reuse']) {
      this.storedRoutes[route.routeConfig!.path!] = handle;
    }
  }

  override shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!this.storedRoutes[route.routeConfig.path!];
  }

  override retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!route.routeConfig || !this.storedRoutes[route.routeConfig.path!]) {
      return null;
    }
    return this.storedRoutes[route.routeConfig.path!];
  }
}
