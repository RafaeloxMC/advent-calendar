"use client";
import { ICalendar } from "@/lib/util/types";
import React, { useEffect, useState } from "react";

function CalendarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
	const id = React.use(params).id;

	const [calendar, setCalendar] = useState<ICalendar | undefined>(undefined);

	useEffect(() => {
		const fetchCalendar = async () => {
			const res = await fetch("/api/calendars/" + id);
			const body = await res.json();
			setCalendar(body.calendar);
		};
		fetchCalendar();
	}, [id]);

	return (
		<div>
			<h1>CalendarDetailsPage for {id}</h1>
			{calendar ? (
				<ul>
					<li>ID: {calendar.calendar_id}</li>
					<li>Title: {calendar.title}</li>
					<li>Passhash: {calendar.password_hash}</li>
				</ul>
			) : (
				<span>No information found for calendar {id}</span>
			)}
		</div>
	);
}

export default CalendarDetailsPage;
