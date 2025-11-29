import Link from "next/link";

export function Hero() {
	return (
		<div className="flex flex-col items-center justify-center text-center text-white drop-shadow-md">
			<h2 className="text-2xl md:text-3xl font-semibold mb-2">
				Create your own
			</h2>
			<h1 className="text-5xl md:text-7xl font-bold mb-4 text-red-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
				Advent Calendar
			</h1>
			<h2 className="text-2xl md:text-3xl font-semibold mb-8">
				in seconds for free!
			</h2>
			<Link
				href="/handler/signup"
				className="px-12 py-4 bg-red-500 hover:bg-red-600 text-white font-bold text-xl rounded-full shadow-lg transform transition hover:scale-105 border-2 border-red-300"
			>
				Get Started
			</Link>
			<span>Already have an account? </span>
			<Link href={"/handler/login"} className="underline">
				Sign in!
			</Link>
		</div>
	);
}
