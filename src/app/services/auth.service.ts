import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  Login(email: string, password: string): Observable<User> {

    return of({
      id: '1',
      name: 'Test User',
      email: 'p4SxO@example.com',
      avatar: '/assets/images/avatar.jpeg'
    });
  }

  Logout(): Observable<boolean> {
    return of(true);
  }
}