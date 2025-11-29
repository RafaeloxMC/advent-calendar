import React from "react";

function InfoCard() {
	return (
		<div className="max-w-4xl mx-auto my-16 p-8 bg-sky-600/90 backdrop-blur-sm rounded-xl shadow-xl text-white">
			<h1 className="text-3xl font-bold mb-6 text-center">
				How it works
			</h1>
			<div className="space-y-6 text-lg leading-relaxed">
				<p>
					Creating your own digital advent calendar is now easier than
					ever! Simply sign up for a free account to get started.
				</p>
				<ol className="list-decimal list-inside space-y-4 ml-4">
					<li>
						<strong>Create a Calendar:</strong> Give your calendar a
						name and customize it to your liking.
					</li>
					<li>
						<strong>Fill the Doors:</strong> Add text, links,
						images, or videos to each of the 24 days.
					</li>
					<li>
						<strong>Share & Enjoy:</strong> Send the unique link to
						your friends and family. You can even password protect
						it so nobody steals the content of your calendar!
					</li>
				</ol>
				<p className="mt-6 text-center font-semibold">
					Spread joy this holiday season with a personalized
					countdown!
				</p>
			</div>
		</div>
	);
}

export default InfoCard;
