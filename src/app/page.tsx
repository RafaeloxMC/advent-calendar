"use client";
import Snowfall from "react-snowfall";
import { Hero } from "@/lib/components/Hero";
import InfoCard from "@/lib/components/InfoCard";
import Features from "@/lib/components/Features";
import LightChain from "@/lib/components/LightChain";

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen items-center justify-center bg-sky-500 font-sans dark:bg-sky-700 p-4 overflow-x-hidden relative">
			<LightChain />
			<Snowfall />
			<div className="w-full max-w-7xl mx-auto py-12 mt-8">
				<Hero />
				<Features />
				<InfoCard />
			</div>
		</div>
	);
}
