import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpContext,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { devEnvironment } from '../../environments/environment.development';
import { AUTH_ENABLED } from '../interceptors/auth.interceptor';
import { Token } from '../interfaces/token';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  //Get user info, if this fails log user out
  getUserInfo(): void {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getAccessToken()
    });
    this.http
      .get<User>(devEnvironment.userInfoURL, {
        headers,
        context: new HttpContext().set(AUTH_ENABLED, false)
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('🚀 ~ HomeComponent ~ catchError ~ error:', error.status);
          //For some reason error.status is undefined
          if (error.message.includes('401')) {
            console.log('logging out');
            this.logout();
          }
          return throwError(
            () =>
              new Error(
                `Error fetching user info: ${error.status}: ${error.message}`
              )
          );
        })
      )
      .subscribe(userInfo => {
        if (userInfo) {
          console.log('🚀 ~ HomeComponent ~ ngOnInit ~ userInfo:', userInfo);
        }
      });
  }

  exchangeCode(code: string): void {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('client_id', devEnvironment.clientID)
      .set('code', code)
      .set('redirect_uri', devEnvironment.redirectURI);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.http
      .post<Token>(devEnvironment.tokenURL, body.toString(), {
        headers,
        context: new HttpContext().set(AUTH_ENABLED, false)
      })
      .subscribe(tokenData => {
        sessionStorage.setItem('accessToken', tokenData.access_token);
        sessionStorage.setItem('idToken', tokenData.id_token);
        sessionStorage.setItem('refreshToken', tokenData.refresh_token);

        this.getUserInfo();
      });
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  logout(): void {
    const url = devEnvironment.logoutURL;
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
      .set('client_id', devEnvironment.clientID)
      .set('refresh_token', refreshToken);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .post(devEnvironment.tokenURL, body.toString(), {
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
