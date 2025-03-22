import { Component } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss'],
	standalone: false
})
export class Tab1Page
{
	constructor(
		private firestoreService: FirestoreService,
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private alertController: AlertController)
	{
		this.firestoreService.getUser(this.authService.getCurrentUser().uid).then((user) =>
		{
			console.log(user);
			if (user)
			{
				this.isTutorialComplete = user.isTutorialComplete;
			}
		});

		this.habitForm = this.formBuilder.group({
			habitName: ['', Validators.required],
			emojiMood: ['', Validators.required],
			emotion: ['', Validators.required],
			trigger: ['', Validators.required],
			context: ['', Validators.required],
			motivationLevel: ['', Validators.required],
			concernLevel: ['', Validators.required]
		});
	}

	// Default to false to prevent annoying flicker.
	public isTutorialComplete: boolean = true;

	public habitForm: FormGroup;

	public closeCard(): void
	{
		this.isTutorialComplete = true;
		this.firestoreService.updateUser(this.authService.getCurrentUser().uid, { isTutorialComplete: true });
	}

	public async logHabit(): Promise<void>
	{
		// this.firestoreService.addHabit(this.habitForm.value);
		if (this.habitForm.invalid)
		{
			await this.presentAlert();
			return;
		}
		else
		{
			console.log(this.habitForm.value);
			const user = this.authService.getCurrentUser();
			this.firestoreService.addHabit(user.uid, this.habitForm.value);
			this.habitForm.reset();
		}
	}

	private async presentAlert()
	{
		const alert = await this.alertController.create({
			header: 'Uh oh! 😔',
			message: 'Please double check your form and try again.',
			buttons: ['OK'],
		});

		await alert.present();
	}
}
