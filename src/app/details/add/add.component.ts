import { HttpClient } from '@angular/common/http';
import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  users = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });
  displayStyle = "none";

  constructor(private http:HttpClient) { }
  @Output() added = new EventEmitter;
  ngOnInit(): void {
  }

  closePopup(){
    this.displayStyle = "none";
  }

  addUser(){
    this.displayStyle = "block";
  }

  onSubmit(){
    this.displayStyle = "none";
    let form = this.users.value;
    console.log(this.users.value);
    this.http.post(`http://localhost:8080/api/tutorials/`,{
      "title": form.title,
      "description":form.description
    }).subscribe(()=>{
      this.users.reset;
      form={};
      this.added.emit();
    });
  }

}
