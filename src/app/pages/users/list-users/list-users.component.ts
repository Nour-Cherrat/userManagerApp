import { Component, OnDestroy, OnInit } from '@angular/core';
import {catchError, lastValueFrom, of, tap} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { UsersService } from 'src/app/services/users.service';
import { UserType } from 'src/app/types/users.type';

@Component({
  selector: 'app-list',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit, OnDestroy {

  public loading = true;
  public activePage: number = 0;
  public users: UserType[] = [];
  public totalPages = 1;

  constructor(public usersService: UsersService,
              private http: HttpClient) {}

  getUsers(page: number = 1): void {
    if (page >= 1 && page <= this.totalPages && this.activePage !== page) {
      this.loading = true;
      this.users = [];
      this.activePage = page;
      const users$ = this.usersService.getUsers(page);
      lastValueFrom(users$).then(response => {
        this.users = response?.data;
        this.totalPages = response?.total_pages;
        this.loading = false;
      }).catch(error => {
        this.users = [];
        this.totalPages = 1;
        this.loading = false;
      });
    }
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    /*
    const deleteUrl = `https://reqres.in/api/users/${userId}`;
    this.http.delete(deleteUrl)
      .pipe(
        tap(() => {
          console.log('User deleted successfully.');
        }),
        catchError((error) => {
          console.error('Error deleting user:', error);
          return of(null);
        })
      )
      .subscribe();
      */
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {

  }
}
