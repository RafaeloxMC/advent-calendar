import React from "react";
import FeatureCard from "./FeatureCard";
import { Gift, Palette, Share, ToolCase } from "lucide-react";

function Features() {
	return (
		<div className="w-full grid grid-cols-4 grid-rows-1 gap-4 mt-8">
			<FeatureCard
				title="Daily Surprises"
				desc="Get new custom gifts, messages or images every single day until December 24!"
				icon={<Gift />}
			/>
			<FeatureCard
				title="Fully Customizable"
				desc="Personalize your calendar with your own photos, colors and themes to match your style!"
				icon={<Palette />}
			/>
			<FeatureCard
				title="Share with Friends"
				desc="Generate a unique link to share your digital calendar with friends and family!"
				icon={<Share />}
			/>
			<FeatureCard
				title="Stealing protection"
				desc="Password-protect your advent calendar to prevent people from stealing your calendars' content!"
				icon={<ToolCase />}
			/>
		</div>
	);
}

export default Features;
