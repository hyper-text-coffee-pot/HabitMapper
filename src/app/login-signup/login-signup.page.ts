import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonIcon } from "@ionic/angular/standalone";

@Component({
	selector: 'app-login-signup',
	templateUrl: './login-signup.page.html',
	styleUrls: ['./login-signup.page.scss'],
	imports: [
		IonIcon,
		IonButton,
		IonContent
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
