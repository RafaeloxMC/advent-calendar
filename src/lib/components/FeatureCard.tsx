import React, { ReactNode } from "react";

interface FeatureCardProps {
	title: string;
	desc: string;
	icon: ReactNode;
}

function FeatureCard(props: FeatureCardProps) {
	return (
		<div className="flex flex-col p-4 shadow rounded-xl bg-sky-600">
			<div className="flex flex-row gap-2 text-red-100">
				<div className="mt-1">{props.icon}</div>
				<h2 className="font-bold">{props.title}</h2>
			</div>
			<p>{props.desc}</p>
		</div>
	);
}

export default FeatureCard;
