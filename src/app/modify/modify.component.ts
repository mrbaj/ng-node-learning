import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DataService } from "../data.service";

@Component({
	selector: "app-modify",
	templateUrl: "./modify.component.html",
	styleUrls: ["./modify.component.css"],
})
export class ModifyComponent implements OnInit {
	edit: boolean = false;
	@Input() user: { id: number; title: String; description: string } | undefined;
	@Output() refresh = new EventEmitter();
	title: String = "";
	description: string = "";
	displayStyle = "none";
	constructor(private http: HttpClient, private dataService: DataService) {}

	ngOnInit(): void {}
	editUser() {
		console.log(this.user, this.title, this.description);
		this.title = this.user!.title;
		this.description = this.user!.description;
		// this.edit = true;
		this.displayStyle = "block";
	}

	closePopup() {
		this.displayStyle = "none";
	}

	save() {
		this.user = {
			id: this.user!.id,
			title: this.title,
			description: this.description,
		};
		this.displayStyle = "none";
		const headers = this.dataService.getTokenHeader();
		this.http
			.put(
				`http://localhost:8080/api/tutorials/${this.user!.id}`,
				{
					title: this.title,
					description: this.description,
				},
				{ headers }
			)
			.subscribe(
				(val) => {
					console.log("sent");
					this.refresh.emit(this.user);
				},
				(err) => {
					this.dataService.tokenError();
				}
			);
	}
}
