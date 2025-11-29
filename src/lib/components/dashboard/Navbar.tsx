import Link from "next/link";
import React from "react";

function DashNavbar() {
	return (
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
	);
}

export default DashNavbar;
