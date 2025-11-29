import React from "react";
import FeatureCard from "./FeatureCard";
import { ToolCase } from "lucide-react";

function Features() {
	return (
		<div className="w-full grid grid-cols-4 grid-rows-1 gap-4 mt-8">
			<FeatureCard
				title="Easy to use"
				desc="Easy to use. Lorem ipsum dolor sit amet constructeur"
				icon={<ToolCase />}
			/>
			<FeatureCard
				title="Easy to use"
				desc="Easy to use. Lorem ipsum dolor sit amet constructeur"
				icon={<ToolCase />}
			/>
			<FeatureCard
				title="Easy to use"
				desc="Easy to use. Lorem ipsum dolor sit amet constructeur"
				icon={<ToolCase />}
			/>
			<FeatureCard
				title="Easy to use"
				desc="Easy to use. Lorem ipsum dolor sit amet constructeur"
				icon={<ToolCase />}
			/>
		</div>
	);
}

export default Features;
