import { Injectable } from '@angular/core';
import { Firestore, setDoc, doc, updateDoc, arrayUnion, getDoc } from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root'
})
export class FirestoreService
{
	constructor(private firestore: Firestore) { }

	// Add a new document to a collection
	addHabit(userId: string, data: any): Promise<any>
	{
		return updateDoc(doc(this.firestore, `users/${ userId }`),
			{
				habits: arrayUnion(data),
				previousHabitsList: arrayUnion(data.habitName.toLowerCase().trim()),
				previousEmojisList: arrayUnion(data.emojiMood),
				previousEmotionsList: arrayUnion(data.emotion.toLowerCase().trim()),
				previousTriggersList: arrayUnion(data.trigger.toLowerCase().trim()),
				previousContextsList: arrayUnion(data.context.toLowerCase().trim()),
			});
	}

	/**
	 * Sign a user up or log them in.
	 * Creates a new user document in all the necessary collections.
	 */
	public addUser(userId: string): void
	{
		userId = userId.trim();
		// Use merge: true to avoid overwriting, make sure you just send an empty object.
		setDoc(doc(this.firestore, `users/${ userId }`), {}, { merge: true });
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

	// Add a new document to a collection
	updateUser(userId: string, data: any): Promise<any>
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
		return updateDoc(doc(this.firestore, `users/${ userId }`), data);
	}
}