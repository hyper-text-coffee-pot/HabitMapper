import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, User, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirestoreService } from './firestore.service';
import { UserStorageService } from './user-storage.service';
import { LoggerService } from './logger.service';
import { HabitMapperUser } from '../models/user/habit-mapper-user';

@Injectable({
	providedIn: 'root'
})
export class AuthService
{
	constructor(
		private afAuth: Auth,
		private router: Router,
		private firestoreService: FirestoreService,
		private userStorageService: UserStorageService,
		private loggerService: LoggerService
	) { }

	public completeSignInWithGooglePopup(): void
	{
		try
		{
			signInWithPopup(this.afAuth, new GoogleAuthProvider())
				.then((result: UserCredential) =>
				{
					if (result.user)
					{
						const user = result.user as User;

						// Map results to Habit Mapper User
						const habitMapperUser: HabitMapperUser = new HabitMapperUser(user);
						const userId = habitMapperUser?.authUser?.uid || '';
						if (userId)
						{
							this.firestoreService.getUser(userId)
								.then((userDoc: any) =>
								{
									if (userDoc)
									{
										// If the user has data in Firestore, update the user object with that data.
										habitMapperUser.MapFromFirestoreData(userDoc);
									}
									else
									{
										// If the user does not have data in Firestore, add the user to Firestore.
										this.firestoreService.addUser(userId);
									}

									// Regardless of whether the user has data in Firestore, set the user in local storage.
									this.userStorageService.setUser(habitMapperUser);
									this.router.navigate(['/tabs']);
								});
						}
						else
						{
							throw new Error('User ID is undefined');
						}
					}
					else
					{
						alert("Well, this is embarrassing. Sign up failed.");
						this.loggerService.logEvent('sign_up_failed', { error: 'Sign up failed.' });
					}
				});
		}
		catch (error)
		{
			this.loggerService.logEvent('sign_up_failed', { error: error });
		}
	}

	public getCurrentUser(): HabitMapperUser | null
	{
		return this.userStorageService.getUser();
	}

	public signOut(): void
	{
		this.afAuth.signOut()
			.then(() =>
			{
				this.userStorageService.clearUser();
				this.router.navigate(['/']);
			}).catch(error => console.error('Error signing out:', error));
	}
}
