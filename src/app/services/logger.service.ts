import { Injectable } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Injectable({
	providedIn: 'root'
})
export class LoggerService
{
	constructor(private analytics: AngularFireAnalytics) { }

	public logEvent(): void
	{
		this.analytics.logEvent('some_event', { some_param: 'some_value' });
	}
}
