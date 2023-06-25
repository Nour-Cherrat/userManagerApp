import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpUsersListResponse } from '../types/users.type';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public perPage = 6;
  private users: any[] = [];

  constructor(protected http: HttpClient) { }

  isLoggedIn(): boolean {
    return false;
  }

  hasUnsavedChanges(): boolean {
    return true;
  }

  getUsers(page: number): Observable<HttpUsersListResponse> {
    return (this.http.get(`${environment.apiLink}/users?delay=1&page=${page}&per_page=${this.perPage}`)) as Observable<HttpUsersListResponse>;
  }

  addUser(user: any) {
    this.users.push(user);
  }
}

