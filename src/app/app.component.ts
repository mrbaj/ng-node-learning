import { HttpClient } from '@angular/common/http';
import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck, OnInit {
  token = '';
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.login_token = localStorage.getItem('token')!;
    this.dataService.loggedInEmail = localStorage.getItem('email')!;
  }

  ngDoCheck(): void {
    console.log('checkin');
    this.token = this.dataService.login_token;
  }
}
