"use client";
import { useState } from "react";

function CreateCalendar() {
	const [title, setTitle] = useState<string>("");
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const [privacy, setPrivacy] = useState<string>(
		"Semi-private (shareable with link)"
	);
	const [password, setPassword] = useState<string>("");

	return (
		<>
			<div className="w-full h-full flex justify-center items-center">
				<div className="m-16 p-4 bg-sky-600 rounded-xl w-4xl flex flex-col gap-4">
					<div>
						<h1 className="text-center w-full">
							Create a new calendar!
						</h1>
						<p>
							Here you can create your own advent calendar with
							ease! Just type in the required information and
							press create!
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<div>
							<span>Title</span>
							<input
								placeholder="My Amazing Advent Calendar!"
								className="bg-sky-500 px-4 py-2 rounded-full w-full focus:ring-0 focus:outline-0"
								value={title}
								onChange={(e) =>
									setTitle(e.currentTarget.value)
								}
							/>
						</div>

						<div>
							<span>Year</span>
							<select
								className="bg-sky-500 px-4 py-2 rounded-full w-full focus:ring-0 focus:outline-0"
								value={year}
								onChange={(e) =>
									setYear(Number(e.currentTarget.value))
								}
							>
								{Array.from(
									{ length: 20 },
									(_, i) => new Date().getFullYear() + i
								).map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
							</select>
						</div>

						<div>
							<span>Privacy</span>
							<select
								className="bg-sky-500 px-4 py-2 rounded-full w-full focus:ring-0 focus:outline-0"
								value={privacy}
								onChange={(e) =>
									setPrivacy(e.currentTarget.value)
								}
							>
								<option>Public</option>
								<option>
									Semi-private (shareable with link)
								</option>{" "}
								<option>Private (password required)</option>
							</select>
						</div>

						{privacy.startsWith("Private") && (
							<div>
								<span>Password</span>
								<input
									placeholder="secret1234!"
									className="bg-sky-500 px-4 py-2 rounded-full w-full focus:ring-0 focus:outline-0"
									value={password}
									type="password"
									onChange={(e) =>
										setPassword(e.currentTarget.value)
									}
								/>
							</div>
						)}

						<button
							className={`bg-sky-500 px-4 py-2 rounded-full w-full focus:ring-0 focus:outline-0 shadow ${
								title &&
								year &&
								privacy &&
								((privacy.startsWith("Private") && password) ||
									!privacy.startsWith("Private"))
									? "cursor-pointer"
									: "cursor-not-allowed"
							}`}
							onClick={async () => {
								const res = await fetch("/api/calendars/new", {
									method: "POST",
									body: JSON.stringify({
										title,
										year,
										password_hash: password ? password : "",
									}),
								});
								console.log("Res: " + (await res.json()));
							}}
						>
							Create calendar
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default CreateCalendar;
