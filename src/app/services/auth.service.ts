import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirestoreService } from './firestore.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService
{
	constructor(
		private afAuth: Auth,
		private router: Router,
		private firestoreService: FirestoreService
	) { }

	public completeSignInWithGooglePopup(): void
	{
		try
		{
			signInWithPopup(this.afAuth, new GoogleAuthProvider())
				.then(result =>
				{
					if (result.user)
					{
						const user = result.user;
						this.firestoreService.addUser(user.uid);
						localStorage.setItem('user', JSON.stringify(user));
						this.router.navigate(['/tabs']);
					}
					else
					{
						alert("Well, this is embarrassing. Sign up failed.");
					}
				});
		}
		catch (error)
		{
			console.error('Error signing in with Google:', error);
		}
	}

	public getCurrentUser(): any
	{
		const user = localStorage.getItem('user');
		return user ? JSON.parse(user) : null;
	}

	public signOut(): void
	{
		this.afAuth.signOut()
			.then(() =>
			{
				localStorage.removeItem('user');
				this.router.navigate(['/']);
			})
			.catch(error => console.error('Error signing out:', error));
	}
}
