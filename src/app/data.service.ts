import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  login_token = '';
  loggedInEmail = '';
  // users:{ id: number; title: String; description: string; }[] | undefined;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    const headers = new HttpHeaders()
      .append('token', this.login_token)
      .append('email', this.loggedInEmail);
    return this.http.get<[{ id: number; title: String; description: string }]>(
      `http://localhost:8080/api/tutorials/`,
      { headers }
    );
  }

  logout() {
    console.log('deeted called');
    this.http
      .delete(
        `http://localhost:8080/api/tutorials/removeToken/${this.login_token}`
      )
      .subscribe();
    this.login_token = '';
    this.loggedInEmail = '';
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }
}
