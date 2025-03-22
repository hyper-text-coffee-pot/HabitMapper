import { v4 as uuidv4 } from 'uuid';

export class Habit
{
	public id: string = '';
	public habitName: string = '';
	public emojiMood: string = '';
	public emotion: string = '';
	public trigger: string = '';
	public context: string = '';
	public concernLevel: string = '';
	public motivationLevel: string = '';
	public timestamp: string = '';

	constructor(
		habitName: string,
		emojiMood: string,
		emotion: string,
		trigger: string,
		context: string,
		concernLevel: string,
		motivationLevel: string
	)
	{
		this.id = uuidv4();
		this.habitName = habitName;
		this.emojiMood = emojiMood;
		this.emotion = emotion;
		this.trigger = trigger;
		this.context = context;
		this.concernLevel = concernLevel;
		this.motivationLevel = motivationLevel;
		this.timestamp = new Date().toISOString();
	}
}
