import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, setDoc, doc } from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root'
})
export class FirestoreService
{
	constructor(private firestore: Firestore) { }

	// Add a new document to a collection
	addDocument(userid: string): Promise<any>
	{
		return setDoc(doc(this.firestore, `users/${ userid }`),
			{
				"color": "red",
				"habits": [
					"Procrastination"
				],
				"habit_name": "Procrastrination",
				"mood": "🚀"
			});
		// return addDoc(collection(this.firestore, `users/${ userid }`), { userid });
	}

	// // Get all documents from a collection
	// getDocuments(collectionName: string): Observable<any[]>
	// {
	// 	return this.firestore.collection(collectionName).valueChanges();
	// }

	// // Update a document in a collection
	// updateDocument(collectionName: string, docId: string, data: any): Promise<void>
	// {
	// 	return this.firestore.collection(collectionName).doc(docId).update(data);
	// }

	// // Delete a document from a collection
	// deleteDocument(collectionName: string, docId: string): Promise<void>
	// {
	// 	return this.firestore.collection(collectionName).doc(docId).delete();
	// }
}