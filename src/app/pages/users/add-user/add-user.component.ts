import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UsersService} from "../../../services/users.service";
import {catchError, tap} from "rxjs";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  public formData!: FormGroup;
  private users: any[] = [];

  ngOnInit(): void {
    this.formData = new FormGroup({
      lastName : new FormControl("", Validators.required),
      firstName : new FormControl("", Validators.required),
      email : new FormControl("", Validators.required),
      job : new FormControl("", Validators.required),
      numTel : new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]{10}/)
      ]))
    })
  }

  constructor(private http: HttpClient,
              private router: Router,
              private usersService: UsersService) { }

  addUser(value: any): void {
    console.log("value: ", value);

    const userData = this.formData.value;

    this.http.post('https://reqres.in/api/users', userData).pipe(
      tap(response => {
        console.log('Enregistrement réussi :', response);
        this.usersService.addUser(userData);
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
