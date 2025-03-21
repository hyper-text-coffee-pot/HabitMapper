import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonIcon } from "@ionic/angular/standalone";
import { AuthService } from '../services/auth.service';

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
	constructor(private authService: AuthService) { }

	public ngOnInit(): void { }

	public async signInWithGoogle(): Promise<void>
	{
		this.authService.completeSignInWithGooglePopup();
	}
}
