import { Injectable } from '@angular/core';
import { Truck } from './truck'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class TruckService {

  constructor(private http: HttpClient, private messageService: MessageService) { }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private trucksUrl = 'http://localhost:3000/api/trucks';  // URL to web api



  /** Log a Truck message with the MessageService */
private log(message: string) {
  this.messageService.add(`TruckService: ${message}`);
}

  getTrucks(): Observable<Truck[]>{
    
    return this.http.get<Truck[]>(this.trucksUrl).pipe(
       catchError(this.handleError<Truck[]>('getTrucks', [])));
  }

  getTruck(registration: String): Observable<Truck>{
  const url = `${this.trucksUrl}/${registration}`;
    
  return this.http.get<Truck>(url).pipe(
    catchError(this.handleError<Truck>(`getTruck registration=${registration}`))
  );
}

/** POST: add a new hero to the server */
addTruck(truck: Truck): Observable<Truck> {
  return this.http.post<Truck>(this.trucksUrl, truck, this.httpOptions).pipe(
    tap((newUser: Truck) => this.log(`added truck w/ registration=${truck.registration}`)),
    catchError(this.handleError<Truck>('addTruck'))
  );
}
/** POST: update a hero in the server */
updateTruck(registration: String): Observable<Truck>{
  const url = `${this.trucksUrl}/inhibit/${registration}`;
  return this.http.patch<Truck>(url, this.httpOptions).pipe(
    tap((newUser: Truck) => this.log(`inhibited truck w/ registration=${registration}`)),
    catchError(this.handleError<Truck>('inhibitTruck'))
  )
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