import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, setDoc, doc, updateDoc, arrayUnion, getDoc } from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root'
})
export class FirestoreService
{
	constructor(private firestore: Firestore) { }

	// Add a new document to a collection
	addDocument(userId: string, data: any): Promise<any>
	{
		// return setDoc(doc(this.firestore, `users/${ userid }`),
		// 	{
		// 		"color": "red",
		// 		"habits": [
		// 			"Procrastination"
		// 		],
		// 		"habit_name": "Procrastrination",
		// 		"mood": "🚀"
		// 	});
		// return addDoc(collection(this.firestore, `users/${ userId }`), data);
		return updateDoc(doc(this.firestore, `users/${ userId }`), { habits: arrayUnion(data) });
	}

	public addUser(userId: string): Promise<void>
	{
		userId = userId.trim();
		const userDocRef = doc(this.firestore, `users/${ userId }`);
		return setDoc(userDocRef, { isTutorialComplete: false }, { merge: true }); // Use merge: true to avoid overwriting
	}

	public async getUser(userId: string): Promise<any>
	{
		const userDocRef = doc(this.firestore, `users/${ userId }`);
		const userDoc = await getDoc(userDocRef);
		if (userDoc.exists())
		{
			return userDoc.data(); // Return the entire document data
		} else
		{
			console.log("No such document!");
			return null;
		}
	}

	public async getUserProperty(userId: string, property: string): Promise<any>
	{
		const userDocRef = doc(this.firestore, `users/${ userId }`);
		const userDoc = await getDoc(userDocRef);
		if (userDoc.exists())
		{
			const userData = userDoc.data();
			return userData[property]; // Return the specific property
		} else
		{
			console.log("No such document!");
			return null;
		}
	}
}