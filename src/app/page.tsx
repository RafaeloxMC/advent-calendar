"use client";
import Snowfall from "react-snowfall";
import { Hero } from "@/lib/components/Hero";
import { InfoCard } from "@/lib/components/InfoCard";

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen items-center justify-center bg-sky-500 font-sans dark:bg-sky-700 p-4">
			<Snowfall />
			<Hero />
			<InfoCard />
		</div>
	);
}
