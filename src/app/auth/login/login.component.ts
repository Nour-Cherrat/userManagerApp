import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {catchError, tap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public formData!: FormGroup;
  private users: any[] = [];

  ngOnInit(): void {
    this.formData = new FormGroup({
      email : new FormControl("", Validators.required),
      password : new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z]\w{3,14}$/)
      ]))

    })
  }

  constructor(private http: HttpClient,
              private router: Router,
              private usersService: UsersService) { }


  loginSubmit(value: any) {
    console.log("value:", value);

    const loginData = this.formData.value;

    this.http.post('https://reqres.in/api/login', loginData).pipe(
      tap(response => {
        console.log('Login réussi :', response);

        this.router.navigate(['/admin']);
      }),
      catchError(error => {
        console.log('Erreur lors du login', error);
        throw error;
      })
    ).subscribe();


  }
}
