import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpContext
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AUTH_ENABLED } from '../interceptors/auth.interceptor';
import { Token } from '../interfaces/token';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  getUserInfo(): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getAccessToken()
    });
    return this.http.get<User>(environment.userInfoURL, {
      headers,
      context: new HttpContext().set(AUTH_ENABLED, false)
    });
  }

  exchangeCode(code: string): void {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('client_id', environment.clientID)
      .set('code', code)
      .set('redirect_uri', environment.redirectURI);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.http
      .post<Token>(environment.tokenURL, body.toString(), {
        headers,
        context: new HttpContext().set(AUTH_ENABLED, false)
      })
      .subscribe(tokenData => {
        sessionStorage.setItem('accessToken', tokenData.access_token);
        sessionStorage.setItem('idToken', tokenData.id_token);
        sessionStorage.setItem('refreshToken', tokenData.refresh_token);
      });
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  logout(): void {
    const url = environment.logoutURL;
    console.log(url);
    sessionStorage.clear();
    location.href = url;
  }

  refreshToken(): Observable<any> {
    console.log('Refreshing token');
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) {
      this.logout();
      throw new Error('Refresh token not found');
    }

    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('client_id', environment.clientID)
      .set('refresh_token', refreshToken);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .post(environment.tokenURL, body.toString(), {
        headers,
        context: new HttpContext().set(AUTH_ENABLED, false)
      })
      .pipe(
        tap((tokens: any) => {
          sessionStorage.setItem('accessToken', tokens.access_token);
          sessionStorage.setItem('idToken', tokens.id_token);
          if (tokens.refresh_token) {
            sessionStorage.setItem('refreshToken', tokens.refresh_token);
          }
        })
      );
  }
}
