import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DataService } from "src/app/data.service";

@Component({
	selector: "app-delete",
	templateUrl: "./delete.component.html",
	styleUrls: ["./delete.component.css"],
})
export class DeleteComponent implements OnInit {
	constructor(private http: HttpClient, private dataService: DataService) {}
	@Input() user: { id: number; title: String; description: string } | undefined;
	@Output() refresh = new EventEmitter();
	displayStyle = "none";

	ngOnInit(): void {}

	showModal() {
		this.displayStyle = "block";
	}

	closePopup() {
		this.displayStyle = "none";
	}

	deleteUser(user: { id: number; title: String; description: string }) {
		const headers = this.dataService.getTokenHeader();
		this.http
			.delete(`http://localhost:8080/api/tutorials/${user.id}`, { headers })
			.subscribe(
				(val) => {
					console.log("Deleted");
					this.refresh.emit(user);
				},
				(error) => {
					this.dataService.tokenError();
				}
			);
	}
}
