"use client";
import LightChain from "@/lib/components/LightChain";
import { ICalendar } from "@/lib/util/types";
import React, { useEffect, useRef, useState } from "react";
import Snowfall from "react-snowfall";

function CalendarPage({ params }: { params: Promise<{ id: string }> }) {
	const id = React.use(params).id;
	const [calendar, setCalendar] = useState<ICalendar | undefined>(undefined);
	const [passwordRequired, setpasswordRequired] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [header, setHeader] = useState<string>("Loading Your Calendar...");
	const passwordFieldRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const fetchCalendar = async () => {
			const res = await fetch("/api/calendars/" + id);
			if (res.status == 401) {
				setpasswordRequired(true);
				setHeader("Please enter the Password!");
				return;
			}
			const body = await res.json();
			setCalendar(body.calendar);
		};
		fetchCalendar();
	}, [id]);

	return (
		<div className="flex flex-col min-h-screen items-center justify-center bg-sky-500 font-sans dark:bg-sky-700 p-4 overflow-x-hidden relative">
			<LightChain />
			<Snowfall />

			{calendar ? (
				<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 shadow-xl text-center mx-auto">
					<h1 className="mb-4">{calendar?.title}</h1>
					<ol className="list-decimal">
						{calendar?.doors.map((door, idx) => {
							console.log(idx, door);
							return (
								<li key={idx}>
									{idx + 1}: {door.name} - {door.content}
								</li>
							);
						})}
					</ol>
				</div>
			) : (
				<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 shadow-xl text-center max-w-md mx-auto">
					<h1>{header}</h1>
					{passwordRequired && (
						<div className="flex flex-col gap-4">
							<input
								placeholder="secret1234!"
								className="bg-sky-500 px-4 py-2 rounded-full w-full focus:ring-0 focus:outline-0"
								value={password}
								type="password"
								onChange={(e) =>
									setPassword(e.currentTarget.value)
								}
								ref={passwordFieldRef}
							/>
							<button
								className={`bg-sky-500 px-4 py-2 rounded-full w-full focus:ring-0 focus:outline-0 shadow`}
								onClick={async () => {
									const res = await fetch(
										"/api/calendars/" +
											id +
											"?password=" +
											password
									);
									if (res.status == 401) {
										setpasswordRequired(true);
										setHeader("Wrong password! Try again!");
										return;
									}
									const body = await res.json();
									setCalendar(body.calendar);
								}}
							>
								Unlock calendar
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default CalendarPage;
