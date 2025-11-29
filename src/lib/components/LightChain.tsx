import React from "react";

export function LightChain() {
	const lights = React.useMemo(() => {
		return Array.from({ length: 20 }).map((_, i) => ({
			id: i,
			colorIndex: i % 3,
			delay: i * 0.2,
			heightOffset: Math.sin(i * 132.45) * 7,
		}));
	}, []);

	return (
		<div className="fixed top-0 left-0 w-full h-12 z-10 mt-4 pointer-events-none overflow-hidden flex justify-between px-4">
			<div className="absolute top-0 left-0 w-full h-2 border-b-2 border-gray-700 rounded-[50%] translate-y-[-50%]"></div>

			{lights.map((light) => {
				return (
					<div
						key={light.id}
						className="relative flex flex-col items-center"
						style={{
							transform: `translateY(${
								Math.round(light.heightOffset * 100) / 100
							}%)`,
						}}
					>
						<div className="w-1 h-3 bg-gray-800"></div>
						<div
							className={`w-4 h-6 rounded-full shadow-md animate-pulse ${
								light.colorIndex === 0
									? "bg-red-500 shadow-red-500/50"
									: light.colorIndex === 1
									? "bg-green-500 shadow-green-500/50"
									: "bg-blue-400 shadow-blue-400/50"
							}`}
							style={{
								animationDelay: `${light.delay}s`,
								animationDuration: "2s",
							}}
						></div>
					</div>
				);
			})}
		</div>
	);
}

export default LightChain;
