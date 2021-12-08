import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class DataService {
	login_token = "";
	loggedInEmail = "";
	// users:{ id: number; title: String; description: string; }[] | undefined;

	constructor(private http: HttpClient, private router: Router) {}

	getAllUsers(): Observable<any> {
		const headers = this.getTokenHeader();
		return this.http.get<[{ id: number; title: String; description: string }]>(
			`http://localhost:8080/api/tutorials/`,
			{ headers }
		);
	}

	logout() {
		console.log("deeted called");
		this.http
			.delete(
				`http://localhost:8080/api/tutorials/removeToken/${this.login_token}`
			)
			.subscribe();
		this.login_token = "";
		this.loggedInEmail = "";
		localStorage.removeItem("token");
		localStorage.removeItem("email");
	}

	tokenError() {
		this.login_token = "";
		this.loggedInEmail = "";
		localStorage.removeItem("token");
		localStorage.removeItem("email");
		this.router.navigateByUrl("/");
	}

	getTokenHeader() {
		return new HttpHeaders()
			.append("token", this.login_token)
			.append("email", this.loggedInEmail);
	}
}
