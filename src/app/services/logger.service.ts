import { Injectable } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';

@Injectable({
	providedIn: 'root'
})
export class LoggerService
{
	constructor(private analytics: Analytics) { }

	public logEvent(): void
	{
		logEvent(this.analytics, 'some_event', { some_param: 'some_value' });
	}
}
