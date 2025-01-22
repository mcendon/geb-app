import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthServiceMockService } from './mock-api/auth-service-mock.service';
import { Session } from './interfaces/session.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authMockService: AuthServiceMockService) {}
  login(
    email: string,
    password: string
  ): Observable<{ session: Session; error: boolean }> {
    // This is a mock implementation.
    // In a real application, you would call an API to authenticate the user.
    return this.authMockService.doLoginMock(email, password);
  }

  logout(): Observable<any> {
    // This is a mock implementation.
    // In a real application, you would call an API to log out the user.
    return of({});
  }
}
