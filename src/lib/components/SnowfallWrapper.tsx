"use client";

import { useMemo } from "react";
import Snowfall from "react-snowfall";

export default function SnowfallWrapper({
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
			{children}
		</div>
	);
}
