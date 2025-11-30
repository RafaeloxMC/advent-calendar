"use client";
import LightChain from "@/lib/components/LightChain";
import { ICalendar } from "@/lib/util/types";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Snowfall from "react-snowfall";

function CalendarPage({ params }: { params: Promise<{ id: string }> }) {
	const id = React.use(params).id;
	const [calendar, setCalendar] = useState<ICalendar | undefined>(undefined);
	const [passwordRequired, setpasswordRequired] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [header, setHeader] = useState<string>("Loading Your Calendar...");
	const passwordFieldRef = useRef<HTMLInputElement>(null);

	const [selected, setSelected] = useState<number>(0);

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
				<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 shadow-xl text-center mx-auto max-w-[95%]">
					{selected != 0 ? (
						<div>
							<h1 className="mb-4">
								{calendar?.title} - Day {selected}
							</h1>
							<div className="">
								<p className="max-w-prose whitespace-pre-wrap wrap-break-word">
									{calendar.doors[selected - 1].content
										? calendar.doors[selected - 1].content
												.split(/(https?:\/\/[^\s]+)/g)
												.map((part, i) =>
													part.match(
														/^https?:\/\//
													) ? (
														<a
															key={i}
															href={part}
															target="_blank"
															rel="noopener noreferrer"
															className="text-blue-200 hover:text-blue-100 underline"
														>
															{
																new URL(part)
																	.hostname
															}
														</a>
													) : (
														part
													)
												)
										: "Nooo! There is no content behind this door :c"}
								</p>
								<p className="mt-4">
									Go{" "}
									<span
										onClick={() => setSelected(0)}
										className="cursor-pointer underline"
									>
										back
									</span>
								</p>
							</div>
						</div>
					) : (
						<div>
							<h1 className="mb-4">{calendar?.title}</h1>
							<div className="grid grid-cols-6 gap-4">
								{calendar?.doors.map((door, idx) => {
									console.log(idx, door);
									return (
										<div
											key={idx + 1}
											className={`aspect-square rounded-xl p-4 border border-white/20 ${
												new Date().getDay() > idx + 1
													? "bg-white/10"
													: "bg-white/1"
											} hover:scale-105 hover:bg-white/20 transition-all cursor-pointer`}
											onClick={() => {
												if (
													new Date().getDay() <
													idx + 1
												) {
													setSelected(idx + 1);
												}
											}}
										>
											<h1>{idx + 1}</h1>
										</div>
									);
								})}
							</div>
						</div>
					)}
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
			<span className="mt-2">
				Go{" "}
				<Link href={"/"} className="underline">
					home
				</Link>
			</span>
		</div>
	);
}

export default CalendarPage;
