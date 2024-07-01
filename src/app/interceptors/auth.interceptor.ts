import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const AUTH_ENABLED = new HttpContextToken<boolean>(() => true);

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const authEnabled = req.context.get(AUTH_ENABLED);

  if (!authEnabled) {
    return handleRequestWithoutAuth(req, next);
  }

  const authToken = authService.getAccessToken();
  if (!authToken) {
    return throwError(
      () =>
        new HttpErrorResponse({
          error: 'Access token is missing',
          status: 401,
          statusText: 'Unauthorized'
        })
    );
  }

  return handleRequestWithAuth(req, next, authService, authToken);
}

function handleRequestWithoutAuth(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => handleError(error)),
    tap(event => logResponse(event, req.url))
  );
}

function handleRequestWithAuth(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  authToken: string
): Observable<HttpEvent<unknown>> {
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return handleTokenRefresh(req, next, authService);
      }
      return throwError(
        () =>
          new Error(
            `Authorized request error: ${error.status}: ${error.message}`
          )
      );
    }),
    tap(event => logResponse(event, req.url))
  );
}

function handleTokenRefresh(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<HttpEvent<unknown>> {
  return authService.refreshToken().pipe(
    switchMap(res => {
      sessionStorage.setItem('accessToken', res.access_token);
      sessionStorage.setItem('idToken', res.id_token);
      sessionStorage.setItem('refreshToken', res.refresh_token);

      const retryReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${res.access_token}`
        }
      });
      return next(retryReq);
    }),
    catchError((error: HttpErrorResponse) => {
      return throwError(
        () =>
          new Error(`Refresh token failed: ${error.status}: ${error.message}`)
      );
    })
  );
}

function handleError(error: HttpErrorResponse): Observable<never> {
  return throwError(
    () => new Error(`Request failed: ${error.status}: ${error.message}`)
  );
}

function logResponse(event: HttpEvent<unknown>, url: string): void {
  //TODO: log to file
  if (event.type === HttpEventType.Response) {
    console.log(url, 'returned a response with status', event.status);
  }
}
