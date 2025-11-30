"use client";

import { ICalendar } from "@/lib/util/types";
import { useUser } from "@stackframe/stack";
import { Calendar, Gift, TreePine } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Dashboard() {
	const user = useUser();
	const router = useRouter();

	const [calendars, setCalendars] = useState<ICalendar[]>([]);

	useEffect(() => {
		if (!user) router.push("/handler/signup");
	}, [user, router]);

	useEffect(() => {
		const fetchUser = async () => {
			const res = await fetch("/api/users/me");
			const body = await res.json();
			setCalendars(body.calendars as ICalendar[]);
		};
		fetchUser();
	}, []);

	if (!user)
		return (
			<div className="min-h-screen bg-sky-500 dark:bg-sky-700 flex flex-col relative overflow-hidden">
				<p>Loading...</p>
			</div>
		);

	return (
		<main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 py-8">
			<section className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 shadow-xl">
				<div className="flex items-center gap-4 mb-4">
					<Gift />
					<div>
						<h2 className="text-xl font-bold text-white">
							Welcome to Your Dashboard!
						</h2>
						<p className="text-white/70">
							Create and manage your advent calendars for the
							holiday season
						</p>
					</div>
				</div>
				<div className="flex gap-4 mt-4">
					<Link
						href="/dashboard/create-calendar"
						className="px-6 py-3 bg-linear-to-r bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
					>
						Create New Calendar
					</Link>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
					<Calendar />
					Your Calendars
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="col-span-full bg-white/5 backdrop-blur-sm rounded-2xl p-12 border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-center">
						{calendars.length > 0 ? (
							<div className="grid grid-cols-3 gap-4">
								{calendars.map((cal, idx) => {
									return (
										<div
											key={idx}
											className="p-4 border border-white/20 bg-white/5 rounded-xl flex flex-col"
										>
											<h1>{cal.title}</h1>
											<p className="text-white/80">
												December {cal.year}
											</p>
											<p className="text-white/80">
												{cal.is_public
													? "Public"
													: cal.password_hash &&
													  cal.password_hash.length >
															0
													? "Password-protected"
													: "Anyone with the link can view"}
											</p>
											<div className="flex flex-row gap-2 mt-auto pt-4">
												<Link
													href={
														"/dashboard/calendars/" +
														cal.calendar_id
													}
													className="w-full px-4 py-2 bg-sky-600 rounded-xl hover:scale-105 hover:bg-sky-700 transition-all"
												>
													Edit
												</Link>
												<Link
													href={
														"/calendars/" +
														cal.calendar_id
													}
													className="w-full px-4 py-2 bg-sky-600 rounded-xl hover:scale-105 hover:bg-sky-700 transition-all"
												>
													Preview
												</Link>
											</div>
										</div>
									);
								})}
							</div>
						) : (
							<div>
								<TreePine />
								<h3 className="text-xl font-semibold text-white mb-2">
									No calendars yet
								</h3>
								<p className="text-white/60 mb-4">
									Create your first advent calendar to spread
									holiday joy!
								</p>
								<Link
									href={"/dashboard/create-calendar"}
									className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
								>
									Get Started
								</Link>
							</div>
						)}
					</div>
				</div>
			</section>
		</main>
	);
}

export default Dashboard;
