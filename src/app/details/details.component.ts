import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, from, map, of } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  token = null;

  users: { id: number; title: String; description: string }[] | undefined;
  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (
      this.dataService.login_token == null &&
      this.dataService.loggedInEmail == null
    ) {
      this.router.navigateByUrl('/');
    } else this.fetchData();
  }

  fetchData() {
    this.dataService.getAllUsers().subscribe(
      (val) => {
        console.log(val);
        this.users = val;
      },
      (error) => {
        this.dataService.login_token = '';
        this.dataService.loggedInEmail = '';
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.router.navigateByUrl('/');
      }
    );
  }

  refresh(user: { id: number; title: String; description: string }) {
    of(this.users!)
      .pipe(map((items) => items.filter((item) => item != user)))
      .subscribe((val) => {
        this.users = [...val];
        console.log('deleted from parent', user, this.users);
      });
  }

  edit(user: any) {
    of(this.users!)
      .pipe(
        map((items) =>
          items.filter((item) => {
            if (item.id == user.id) {
              item.title = user.title;
              item.description = user.description;
            }
            return item;
          })
        )
      )
      .subscribe((val) => {
        this.users = [...val];
        console.log('Edited');
      });
  }

  userAdded() {
    console.log('called');
    this.http
      .get<[{ id: number; title: String; description: string }]>(
        `http://localhost:8080/api/tutorials/`
      )
      .subscribe((val) => {
        this.users = val;
      });
  }
}
