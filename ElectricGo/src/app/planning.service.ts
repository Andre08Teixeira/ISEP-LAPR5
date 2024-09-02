import { Injectable } from '@angular/core';
import { Planning } from './planning'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class PlanningService {

  constructor(private http: HttpClient, private messageService: MessageService) { }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private planningsUrl = 'http://localhost:3002/Planning';  // URL to web api
  private tripsUrl = 'http://localhost:3000/api/trips';
  private trucksUrl = 'http://localhost:3000/api/trucks';
  private deliveriesUrl = 'https://localhost:5001/api/delivery';


  /** Log a Planning message with the MessageService */
private log(message: string) {
  this.messageService.add(`PlanningService: ${message}`);
}

  getPlannings(): Observable<Planning[]>{

    return this.http.get<Planning[]>(this.tripsUrl).pipe(
      catchError(this.handleError<Planning[]>('getPlannings', [])));
  }

  getPlanning(heuristica: String, data:number): Observable<string[]>{
    // For now, assume that a course with the specified `id` always exists.
  // Error handling will be added in the next step of the tutorial.
  const url = `${this.planningsUrl}/${heuristica}?data=${data}`;

  return this.http.get<string[]>(url).pipe(
    
    catchError(this.handleError<string[]>(`getPlanning of date=${data}`))
  );
}
getPlanning2(genetic: String,ng:string,pd:string,cp:string,mp:string): Observable<string[]>{
  // For now, assume that a course with the specified `id` always exists.
// Error handling will be added in the next step of the tutorial.
const url = `${this.planningsUrl}/${genetic}?a=${ng}&b=${pd}&c=${cp}&d=${mp}`;

return this.http.get<string[]>(url).pipe(
  
  catchError(this.handleError<string[]>(`getPlanning using ${genetic}`))
);
}


/** POST: add a new hero to the server */
addPlanning(planning: Planning): Observable<Planning> {
  console.log('data',planning.data);
  if (planning.data == '') {
    return of(null).pipe(
      tap(() => this.log('Insert a valid date')),
      catchError(this.handleError<Planning>('No data'))
    );
  }
  if (planning.armazens.length < 3) {
    return of(null).pipe(
      tap(() => this.log('There are no deliveries for that date')),
      catchError(this.handleError<Planning>('No deliveries'))
    );
  }
  return this.http.post<Planning>(this.tripsUrl, planning, this.httpOptions).pipe(
    tap((newPlanning: Planning) => this.log(`added planning w/ date= ${newPlanning.data}, truck = ${newPlanning.truckRegistration}, using ${newPlanning.heuristica}`)),
    catchError(this.handleError<Planning>('addPlanning'))
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
