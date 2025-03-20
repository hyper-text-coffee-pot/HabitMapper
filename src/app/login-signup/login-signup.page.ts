import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonTitle, IonButton, IonIcon } from "@ionic/angular/standalone";

@Component({
	selector: 'app-login-signup',
	templateUrl: './login-signup.page.html',
	styleUrls: ['./login-signup.page.scss'],
	imports: [
		IonIcon,
		IonButton,
		IonTitle,
		IonContent,
		IonToolbar,
		IonHeader
	]
})
export class LoginSignupPage implements OnInit
{
	constructor() { }

	public ngOnInit(): void
	{
	}

	public signInWithGoogle(): void
	{

	}
}
