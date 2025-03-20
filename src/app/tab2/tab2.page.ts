import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss'],
	standalone: false,
})
export class Tab2Page
{
	constructor(
		private afAuth: AngularFireAuth,
		private router: Router
	) { }

	public async signOut(): Promise<void>
	{
		try
		{
			await this.afAuth.signOut();
			console.log('User signed out');
			localStorage.removeItem('user');
			this.router.navigate(['/']);
		} catch (error)
		{
			console.error('Error signing out:', error);
		}
	}
}
