import React from "react";

function Footer() {
	return (
		<div className="w-full h-full flex flex-row items-center justify-center mb-4 mt-auto">
			<p>Made with ❤️ and 🎁 - &copy; {new Date().getFullYear()} xvcf</p>
		</div>
	);
}

export default Footer;
