import { Injectable } from '@angular/core';
import { InMemoryDataService } from './in-memory-data.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceMockService {
  constructor(private database: InMemoryDataService) {}

  //just a mock implementation. demo / prototype purposes
  doLoginMock(email: string, password: string): Observable<any> {
    const user = this.database.users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      const session = this.database.createSession(user);
      return of({ error: false, session });
    } else {
      return of({ error: true, session: null });
    }
  }
}
