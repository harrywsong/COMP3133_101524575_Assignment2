import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LOGIN_QUERY, SIGNUP_MUTATION } from '../graphql/graphql';
import { User } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // Currently logged in user
  private currentUser: User | null = null;

  constructor(private apollo: Apollo, private router: Router) {
    // Restore session if user previously logged in
    const stored = sessionStorage.getItem('current_user');
    if (stored) {
      this.currentUser = JSON.parse(stored);
    }
  }

  // Login with username or email + password
  login(username: string, password: string) {
    return this.apollo.query<any>({
      query: LOGIN_QUERY,
      variables: { username, password },
      fetchPolicy: 'no-cache'
    }).pipe(
      map(result => {
        const user = result.data.login.user;
        this.currentUser = user;
        sessionStorage.setItem('current_user', JSON.stringify(user));
        return user;
      })
    );
  }

  // Register a new user account
  signup(username: string, email: string, password: string) {
    return this.apollo.mutate<any>({
      mutation: SIGNUP_MUTATION,
      variables: { username, email, password }
    }).pipe(
      map(result => {
        const user = result.data.signup.user;
        this.currentUser = user;
        sessionStorage.setItem('current_user', JSON.stringify(user));
        return user;
      })
    );
  }

  // Clear session and redirect to login
  logout() {
    this.currentUser = null;
    sessionStorage.removeItem('current_user');
    this.router.navigate(['/login']);
  }

  // Returns the currently logged in user
  getUser(): User | null {
    return this.currentUser;
  }

  // Check if a user is logged in
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}