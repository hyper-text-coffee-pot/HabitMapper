import { Component } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

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
		private authService: AuthService)
	{
		this.firestoreService.getUser(this.authService.getCurrentUser().uid).then((user) =>
		{
			console.log(user);
			if (user)
			{
				this.closeCard = user.isTutorialComplete;
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

	public showCard: boolean = true;

	public habitForm: FormGroup;

	public closeCard(): void
	{
		this.showCard = false;
	}

	public logHabit(): void
	{
		// this.firestoreService.addHabit(this.habitForm.value);
		if (this.habitForm.invalid)
		{
			return;
		}
		else
		{
			console.log(this.habitForm.value);
			const user = this.authService.getCurrentUser();
			this.firestoreService.addDocument(user.uid, this.habitForm.value);
			this.habitForm.reset();
		}
	}
}
