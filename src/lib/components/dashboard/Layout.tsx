"use client";

import { useMemo } from "react";
import Snowfall from "react-snowfall";
import DashNavbar from "./Navbar";
import Footer from "./Footer";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const snowfall = useMemo(() => {
		return <Snowfall />;
	}, []);

	return (
		<div className="min-h-screen bg-sky-500 dark:bg-sky-700 flex flex-col relative overflow-hidden">
			{snowfall}
			<DashNavbar />
			{children}
			<Footer />
		</div>
	);
}
