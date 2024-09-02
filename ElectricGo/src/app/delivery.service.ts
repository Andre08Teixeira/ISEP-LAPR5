import { Injectable } from '@angular/core';
import { Delivery } from './delivery'
import { DELIVERIES } from './mock-delivery';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'any'
})
export class DeliveryService {

  constructor(private http: HttpClient, private messageService: MessageService) { }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private deliveriesUrl = 'https://localhost:5001/api/delivery';  // URL to web api



  /** Log a Delivery message with the MessageService */
private log(message: string) {
  this.messageService.add(`DeliveryService: ${message}`);
}

  getDeliveries(): Observable<Delivery[]>{
    
    return this.http.get<Delivery[]>(this.deliveriesUrl).pipe(
        catchError(this.handleError<Delivery[]>('getDeliveries', [])));
  }

  getDelivery(id: String): Observable<Delivery>{
    // For now, assume that a delivery with the specified `id` always exists.
  // Error handling will be added in the next step of the tutorial.
  const url = `${this.deliveriesUrl}/${id}`;
    
  return this.http.get<Delivery>(url).pipe(
    catchError(this.handleError<Delivery>(`getDelivery id=${id}`))
  );
}

/** POST: add a new hero to the server */
addDelivery(delivery: Delivery): Observable<Delivery> {
  
  
  return this.http.post<Delivery>(this.deliveriesUrl, delivery, this.httpOptions).pipe(
    tap((newDelivery: Delivery) => this.log(`added delivery w/ id= ${newDelivery.id}`)),
    catchError(this.handleError<Delivery>('addDelivery'))
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