import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Form, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { DataService } from "src/app/data.service";

@Component({
	selector: "app-add",
	templateUrl: "./add.component.html",
	styleUrls: ["./add.component.css"],
})
export class AddComponent implements OnInit {
	users = new FormGroup({
		title: new FormControl(""),
		description: new FormControl(""),
	});
	displayStyle = "none";

	constructor(
		private http: HttpClient,
		private dataService: DataService,
		private router: Router
	) {}
	@Output() added = new EventEmitter();
	ngOnInit(): void {}

	closePopup() {
		this.displayStyle = "none";
	}

	addUser() {
		this.displayStyle = "block";
	}

	onSubmit() {
		this.displayStyle = "none";
		let form = this.users.value;
		console.log(this.users.value);
		const headers = this.dataService.getTokenHeader();
		this.http
			.post(
				`http://localhost:8080/api/tutorials/`,
				{
					title: form.title,
					description: form.description,
				},
				{ headers }
			)
			.subscribe(
				(val) => {
					this.users.reset;
					form = {};
					this.added.emit();
				},
				(error) => {
					this.dataService.tokenError();
				}
			);
	}
}
