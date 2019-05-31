import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
//import { catchError, retry } from 'rxjs/operators';
import {map,tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient ) {
    
   }

  login(username:string, password:string) {

var userData = "username=" + username + "&password=" + password + "&grant_type=password";
var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
        return this.http.post<{access_token:  string}>('http://localhost:64230/token', userData, { headers: reqHeader })
            .pipe(map(user => {
        
                if (user && user.access_token) {
                    console.log(user.access_token);
                    localStorage.setItem('token', user.access_token);
                   var token= localStorage.getItem('token');
                   this.getLoggedInUser(token).subscribe(d=>
                    {
                      console.log(d)
                    });
                }
                else {
                  
                }
            }));
}

getLoggedInUser(auth_token): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'bearer '+auth_token
  })
  return this.http.get('http://localhost:64230/api/Default', { headers: headers })
}

}
