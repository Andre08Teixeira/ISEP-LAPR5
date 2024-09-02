import { Injectable } from '@angular/core';
import { Package } from './package'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class PackageService {

  constructor(private http: HttpClient, private messageService: MessageService) { }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private packagesUrl = 'http://localhost:3000/api/packages';  // URL to web api



  /** Log a Package message with the MessageService */
private log(message: string) {
  this.messageService.add(`PackageService: ${message}`);
}

  getPackages(): Observable<Package[]>{

    return this.http.get<Package[]>(this.packagesUrl).pipe(
      catchError(this.handleError<Package[]>('getPackages', []))
      );
  }

  getPackage(id: String): Observable<Package>{
    // For now, assume that a package with the specified `id` always exists.
  // Error handling will be added in the next step of the tutorial.
  const url = `${this.packagesUrl}/${id}`;

  return this.http.get<Package>(url).pipe(
    catchError(this.handleError<Package>(`getPackage id=${id}`))
  );
}

/** POST: add a new hero to the server */
addPackage(packagee: Package): Observable<Package> {
  return this.http.post<Package>(this.packagesUrl, packagee, this.httpOptions).pipe(
    tap((packagee: Package) => this.log(`added package w/ id= ${packagee.id}`)),
    catchError(this.handleError<Package>('addPackage'))
  );
}

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}