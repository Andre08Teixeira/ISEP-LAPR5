import { Injectable } from '@angular/core';
import { Course } from './course'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class CourseService {

  constructor(private http: HttpClient, private messageService: MessageService) { }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private coursesUrl = 'http://localhost:3000/api/courses';  // URL to web api



  /** Log a Course message with the MessageService */
private log(message: string) {
  this.messageService.add(`CourseService: ${message}`);
}

  getCourses(): Observable<Course[]>{

    return this.http.get<Course[]>(this.coursesUrl).pipe(catchError(this.handleError<Course[]>('getCourses', [])));
  }

  getCourse(id: String): Observable<Course>{
    // For now, assume that a course with the specified `id` always exists.
  // Error handling will be added in the next step of the tutorial.
  const url = `${this.coursesUrl}/${id}`;

  return this.http.get<Course>(url).pipe(
    catchError(this.handleError<Course>(`getCourse id=${id}`))
  );
}

/** POST: add a new hero to the server */
addCourse(course: Course): Observable<Course> {
  return this.http.post<Course>(this.coursesUrl, course, this.httpOptions).pipe(
    tap((newCourse: Course) => this.log(`added course w/ id= ${newCourse.id}`)),
    catchError(this.handleError<Course>('addCourse'))
  );
}

/*
updateCourse(course: Course){
  const url = `${this.coursesUrl}/${course.id}`;
  return this.http.put<Course>(url, course, this.httpOptions).pipe(
    catchError(this.handleError<Course>('updateCourse'))
  );
}


deleteCourse(id: String){
  const url = `${this.coursesUrl}/${id}`;
  return this.http.delete<Course>(url, this.httpOptions).pipe(
    catchError(this.handleError<Course>('deleteCourse'))
  );
}
*/

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
