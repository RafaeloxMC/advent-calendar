"use client";

import { useUser } from "@stackframe/stack";
import { Calendar, Gift, TreePine } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Snowfall from "react-snowfall";

function Dashboard() {
	const user = useUser();
	const router = useRouter();

	useEffect(() => {
		if (!user) router.push("/handler/signup");
	}, [user, router]);

	if (!user)
		return (
			<div className="min-h-screen bg-sky-500 dark:bg-sky-700 flex flex-col relative overflow-hidden">
				<p>Loading...</p>
			</div>
		);

	return (
		<div className="min-h-screen bg-sky-500 dark:bg-sky-700 flex flex-col relative overflow-hidden">
			<Snowfall />

			<header className="relative z-10 bg-linear-to-r from-[#c41e3a] via-[#a51830] to-[#c41e3a] shadow-lg">
				<div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<h1 className="text-2xl font-bold text-white drop-shadow-lg">
							<Link href={"/"}>Advent Calendar</Link>
						</h1>
					</div>
					<nav className="flex items-center gap-4">
						<button className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg">
							My Calendars
						</button>
						<button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all">
							Settings
						</button>
					</nav>
				</div>
			</header>

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
						<button className="px-6 py-3 bg-linear-to-r bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
							Create New Calendar
						</button>
					</div>
				</section>

				<section>
					<h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
						<Calendar />
						Your Calendars
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="col-span-full bg-white/5 backdrop-blur-sm rounded-2xl p-12 border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-center">
							<TreePine />
							<h3 className="text-xl font-semibold text-white mb-2">
								No calendars yet
							</h3>
							<p className="text-white/60 mb-4">
								Create your first advent calendar to spread
								holiday joy!
							</p>
							<button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl">
								Get Started
							</button>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default Dashboard;
