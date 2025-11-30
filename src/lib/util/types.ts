export interface ICalendar {
	id: string;
	calendar_id: string;
	owner_id: string;
	password_hash: string;
	title: string;
	year: number;
	is_public: boolean;
	doors: [
		{
			name: string;
			content: string;
		}
	];
	created_at: Date;
	updated_at: Date;
}
