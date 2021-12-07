import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private router: Router
  ) {}
  isNew = true;
  email = '';
  password = '';
  invalidCred = '';

  ngOnInit(): void {}

  register() {}

  toggle() {
    this.isNew = !this.isNew;
  }

  login() {
    this.http
      .get<{ email: String; token: string }>(
        `http://localhost:8080/api/tutorials/getTeacher?email=${this.email}&password=${this.password}`
      )
      .subscribe(
        (data) => {
          console.log(data.token);
          this.dataService.login_token = data.token;
          this.dataService.loggedInEmail = this.email;
          localStorage.setItem('token', data.token);
          localStorage.setItem('email', this.email);
          this.router.navigateByUrl('/UserManagementConsole');
        },
        (error) => {
          if (error.status == 404) this.invalidCred = 'Incorrect Credentials';
          else this.invalidCred = 'Server Down, try after some time';

          setTimeout(() => {
            this.invalidCred = '';
          }, 2000);
        }
      );
  }
}
