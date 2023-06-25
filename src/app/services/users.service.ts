import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, isEmpty, Observable, tap} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpUsersListResponse } from '../types/users.type';
import {Router} from "@angular/router";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public perPage = 6;
  private users: any[] = [];
  private _token:any ;


  constructor(protected http: HttpClient,
              private router: Router) { }

  isLoggedIn(): boolean {
    return true;
  }
  public  getToken(){
    const abc  = localStorage.getItem("myToken")
    if(abc !== null)
      this._token=  JSON.parse(abc).token
    return this._token
  }
  public isEmpty(str :string) {
    return (!str || str.length === 0);
  }
  public hasAcces (){
    const token =  this.getToken()
    if(!this.isEmpty(token)) return true
    return false
  }
  private get _httpOptions() {
    return {
      headers:
        this._token &&
        new HttpHeaders(
          this._token
            ? {
              Authorization: `Bearer ${this._token}`,
            }
            : {},
        ),
    };
  }

  public  loggin (loginData:any){
     this.http.post('https://reqres.in/api/login', loginData).pipe(
      tap(response => {
        console.log('Login réussi :', response);
         localStorage.setItem("myToken",JSON.stringify(response))
        this.router.navigate(['/admin']);

        return response
      }),
      catchError(error => {
        console.log('Erreur lors du login', error);
        throw error;
      })
    ).subscribe();

  }
  isTokenExist(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  hasUnsavedChanges(): boolean {
    return true;
  }


  getUsers(page: number): Observable<HttpUsersListResponse> {
    return (this.http.get(`${environment.apiLink}/users?delay=1&page=${page}&per_page=${this.perPage}`)) as Observable<HttpUsersListResponse>;
  }

  addUser(userData: any) {
    //this.users.push(user);
    this.http.post('https://reqres.in/api/users', userData).pipe(
      tap(response => {
        console.log('Enregistrement réussi :', response);
        //this.usersService.addUser(userData);
        this.users.push(userData); // Add the new user to the local users array
        const usersLength = this.users.length;
        console.log('Users length:', usersLength);
        console.log('Users:', this.users);

        this.router.navigate(['/admin/users']);
      }),
      catchError(error => {
        console.log('Erreur lors de l enregistrement :', error);
        throw error;
      })
    ).subscribe();
  }
}

