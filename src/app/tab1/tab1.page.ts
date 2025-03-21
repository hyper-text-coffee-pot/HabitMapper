import { Component } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { IonInput, IonItem, IonList } from '@ionic/angular/standalone';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss'],
	standalone: false
})
export class Tab1Page
{
	constructor(private firestoreService: FirestoreService) { }

	// addDocument()
	// {
	// 	this.firestoreService.addDocument('test', { name: 'John Doe' })
	// 		.then(() => console.log('Document added'));
	// }
}
