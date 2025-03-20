import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonIcon } from "@ionic/angular/standalone";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

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
	constructor(
		private afAuth: AngularFireAuth,
		private router: Router
	) { }

	public ngOnInit(): void { }

	public async signInWithGoogle(): Promise<void>
	{
		try
		{
			const result = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
			console.log('User signed in:', result.user);
			localStorage.setItem('user', JSON.stringify(result.user));
			this.router.navigate(['/tabs']);
		} catch (error)
		{
			console.error('Error signing in with Google:', error);
		}
	}
}
