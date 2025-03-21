import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonIcon } from "@ionic/angular/standalone";
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';

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
		private afAuth: Auth,
		private router: Router,
		private firestoreService: FirestoreService
	) { }

	public ngOnInit(): void { }

	public async signInWithGoogle(): Promise<void>
	{
		try
		{
			signInWithPopup(this.afAuth, new GoogleAuthProvider())
				.then(result =>
				{
					if (result.user)
						this.addUser(result.user.uid);

					localStorage.setItem('user', JSON.stringify(result?.user));

					this.router.navigate(['/tabs']);
				});


		}
		catch (error)
		{
			console.error('Error signing in with Google:', error);
		}
	}

	private addUser(userId: string): void
	{
		userId = userId.trim();
		this.firestoreService.addDocument(userId)
			.then(() => console.log('Document added'))
			.catch(error => console.error('Error adding document:', error));
	}
}
