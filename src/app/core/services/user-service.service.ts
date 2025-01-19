import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from './interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`api/users/${id}`).pipe(
      map((user: User) => {
        delete user.password; // Remove the 'password' property
        return user;
      })
    );
  }
}
