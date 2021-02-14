import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })
export abstract class BaseService<T> {

  constructor(private url: string, private http: HttpClient) {
   
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url)
      .pipe(
        tap(data => console.log('getAll: ', data)
        ),
        //catchError(this.handleError)
      );
  }
//IRequestFilter[]
  filter(filters: any[]): Observable<T[]> {
    let filterstring = '?';
    const concatReduce = (accumulator, currentValue) => accumulator + currentValue.key + '=' + currentValue.value+"&";
    filterstring = filters.reduce(concatReduce, filterstring);
    const url = this.url + filterstring;
    console.log(url.substring(0, url.length - 1));
    return this.http.get<T[]>(url.substring(0, url.length - 1))
    // return this.http.get<T[]>(url.substring(0, url.length - 1))
      .pipe(
        tap(data => console.log('get items: ', data)),
        //catchError(this.handleError)
      );
  
    }

  getById(id: any): Observable<T> {
    const url = this.url + '?id=' + id;
    //slash retirado 
    return this.http.get<T>(url)
      .pipe(
       // tap(data => console.log('get item : ', data)),
        //catchError(this.handleError)
      );
  }
  

  delete(id: number): Observable<T> {
    return this.http.delete<T>(this.url + '/' + id)
      .pipe(
        tap(data => console.log('item deleted: ', data)),
        //catchError(this.handleError)
      );
  }

  edit(id: number, instance: T): Observable<T> {
    return this.http.put<T>(this.url + '/' + id, instance)
      .pipe(
        tap(data => console.log('edit item: ', data)),
        //catchError(this.handleError)
      );
  }

  create(instance: T): Observable<T> {
    return this.http.post<T>(this.url, instance)
      .pipe(
        tap(data => console.log('item created: ', data)),
        // catchError(this.handleError)
      );
  }

  uploadImage(id:number, instance: T): Observable<T> {
    return this.http.put<T>(this.url+"/"+id, instance)
      .pipe(
        tap(data => console.log('item edit image:', data)),
        // catchError(this.handleError)
      );
  }

  uploadFile(instance: T): Observable<T> {
    return this.http.post<T>(this.url, instance)
      .pipe(
        tap(data => console.log('item created: ', data)),
        //catchError(this.handleError)
      );
  }

  getByName(name: string): Observable<T[]> {
    let url = this.url + '?pattern=' + name;
    console.log(url);
    return this.http.get<T[]>(url)
      .pipe(
        tap(data => console.log('get items: ', data)),
      //  catchError(this.handleError)
      );
  }


  handleError(error: any) {
    // let errorMessage = '';
    // if (error.error instanceof ErrorEvent) {
    //   // client-side error
    //   errorMessage = `Error: ${error.error.message}`;
    // } else {
    //   // server-side error
    //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    // }
    let errorMessage = '';
    // if (error.error instanceof ErrorEvent) {
    //     errorMessage = `Error: ${error.error.message}`;
    // } else {
    //     errorMessage = error.error[Object.keys(error.error)[0]][0];
    // }

    return throwError(error);
  }
  
  getHttp(): HttpClient {
    return this.http;
  }

}
