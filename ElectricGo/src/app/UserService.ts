import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Role } from './Role';
import { User } from './User';

@Injectable({
  providedIn: 'any'
})
export class UserService {

  constructor(private http: HttpClient, private messageService: MessageService) { }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
                      
  private rolesUrl = 'http://localhost:3000/api/roles';  // URL to web api

  private usersUrl = 'http://localhost:3000/api/auth/signup';  // URL to web api

  private usersUrl2 = 'http://localhost:3000/api/users';

getRoles(): Observable<Role[]>{
  return this.http.get<Role[]>(this.rolesUrl).pipe(
      catchError(this.handleError<Role[]>('getRoles', [])));
  }

getUsers(): Observable<User[]>{
  return this.http.get<User[]>(this.usersUrl2).pipe(
     catchError(this.handleError<User[]>('getUsers', [])));
}

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
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`added user w/ email=${user.email}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  updateUser(email: String): Observable<User>{
    const url = `${this.usersUrl2}/anonymize/${email}`;
    return this.http.patch<User>(url, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`anonymized user w/ email=${email}`)),
      catchError(this.handleError<User>('anonymizeUser'))
    )
  }


  getUserEmail(email: String): Observable<User>{
    const url = `${this.usersUrl2}/${email}`;
      
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUser registration=${email}`))
    );
  }

}