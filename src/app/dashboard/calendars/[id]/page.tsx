"use client";
import { ICalendar } from "@/lib/util/types";
import {
	Calendar,
	X,
	Gift,
	Lock,
	Globe,
	Link as LinkIcon,
	ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

interface Door {
	name: string;
	content: string;
}

function CalendarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
	const id = React.use(params).id;

	const [calendar, setCalendar] = useState<ICalendar | undefined>(undefined);
	const [loading, setLoading] = useState(true);
	const [doors, setDoors] = useState<Door[]>([]);
	const [selectedDoor, setSelectedDoor] = useState<number | null>(null);
	const [doorName, setDoorName] = useState("");
	const [doorContent, setDoorContent] = useState("");
	const [saving, setSaving] = useState(false);
	const [passwordRequired, setPasswordRequired] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const fetchCalendar = useCallback(
		async (pwd?: string) => {
			try {
				const url = pwd
					? `/api/calendars/${id}?password=${encodeURIComponent(pwd)}`
					: `/api/calendars/${id}`;
				const res = await fetch(url);

				if (res.status === 401) {
					setPasswordRequired(true);
					if (pwd) {
						setPasswordError("Wrong password. Please try again.");
					}
					return;
				}

				const body = await res.json();
				setCalendar(body.calendar);
				setPasswordRequired(false);
				setPasswordError("");

				if (body.calendar?.doors) {
					setDoors(body.calendar.doors);
				} else {
					setDoors(
						Array.from({ length: 24 }, (_, i) => ({
							name: `Day ${i + 1}`,
							content: "",
						}))
					);
				}
			} catch (error) {
				console.error("Failed to fetch calendar:", error);
			} finally {
				setLoading(false);
			}
		},
		[id]
	);

	useEffect(() => {
		fetchCalendar();
	}, [fetchCalendar]);

	const handlePasswordSubmit = () => {
		if (password.trim()) {
			setLoading(true);
			fetchCalendar(password);
		}
	};

	const openDoorEditor = (doorIndex: number) => {
		setSelectedDoor(doorIndex);
		setDoorName(doors[doorIndex]?.name || `Day ${doorIndex + 1}`);
		setDoorContent(doors[doorIndex]?.content || "");
	};

	const closeDoorEditor = () => {
		setSelectedDoor(null);
		setDoorName("");
		setDoorContent("");
	};

	const saveDoor = async () => {
		if (selectedDoor === null) return;

		setSaving(true);
		const updatedDoors = [...doors];
		updatedDoors[selectedDoor] = {
			name: doorName,
			content: doorContent,
		};
		setDoors(updatedDoors);

		try {
			await fetch("/api/calendars/" + id, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					doors: updatedDoors,
				}),
			});
		} catch (error) {
			console.error("Failed to save door:", error);
		} finally {
			setSaving(false);
			closeDoorEditor();
		}
	};

	const getPrivacyInfo = () => {
		if (!calendar) return null;
		if (calendar.is_public) {
			return {
				icon: <Globe className="w-4 h-4" />,
				text: "Public",
				color: "text-green-300",
			};
		}
		if (calendar.password_hash) {
			return {
				icon: <Lock className="w-4 h-4" />,
				text: "Password Protected",
				color: "text-yellow-300",
			};
		}
		return {
			icon: <LinkIcon className="w-4 h-4" />,
			text: "Link Only",
			color: "text-blue-300",
		};
	};

	if (loading) {
		return (
			<main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 py-8">
				<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 shadow-xl flex items-center justify-center">
					<div className="animate-pulse text-white text-xl">
						Loading calendar...
					</div>
				</div>
			</main>
		);
	}

	if (!calendar) {
		if (passwordRequired) {
			return (
				<main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 py-8">
					<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 shadow-xl text-center max-w-md mx-auto">
						<h2 className="text-xl font-bold text-white mb-2">
							Password Required
						</h2>
						<p className="text-white/70 mb-6">
							This calendar is password protected. Please enter
							the password to access it.
						</p>
						{passwordError && (
							<p className="text-red-300 mb-4 text-sm">
								{passwordError}
							</p>
						)}
						<div className="flex flex-col gap-4">
							<input
								type="password"
								placeholder="Enter password..."
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								onKeyDown={(e) =>
									e.key === "Enter" && handlePasswordSubmit()
								}
								className="w-full bg-sky-500/50 px-4 py-3 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/30 focus:outline-none border border-white/10"
							/>
							<button
								onClick={handlePasswordSubmit}
								className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
							>
								Unlock Calendar
							</button>
							<Link
								href="/dashboard"
								className="text-white/60 hover:text-white transition-colors text-sm"
							>
								Back to Dashboard
							</Link>
						</div>
					</div>
				</main>
			);
		}

		return (
			<main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 py-8">
				<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 shadow-xl text-center">
					<Gift className="w-16 h-16 mx-auto text-white/50 mb-4" />
					<h2 className="text-xl font-bold text-white mb-2">
						Calendar Not Found
					</h2>
					<p className="text-white/70 mb-6">
						We couldn&apos;t find a calendar with ID: {id}
					</p>
					<Link
						href="/dashboard"
						className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
					>
						<ArrowLeft className="w-4 h-4" />
						Back to Dashboard
					</Link>
				</div>
			</main>
		);
	}

	const privacyInfo = getPrivacyInfo();

	return (
		<main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 py-8">
			<section className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 shadow-xl">
				<div className="flex items-center gap-2 text-white/60 mb-4">
					<Link
						href="/dashboard"
						className="hover:text-white transition-colors"
					>
						Dashboard
					</Link>
					<span>/</span>
					<span className="text-white">{calendar.title}</span>
				</div>

				<div className="flex items-start justify-between flex-wrap gap-4">
					<div className="flex items-center gap-4">
						<Calendar className="w-8 h-8 text-red-300" />
						<div>
							<h1 className="text-2xl font-bold text-white">
								{calendar.title}
							</h1>
							<div className="flex items-center gap-4 mt-1">
								<span className="text-white/70">
									Year: {calendar.year}
								</span>
								{privacyInfo && (
									<span
										className={`flex items-center gap-1 ${privacyInfo.color}`}
									>
										- {privacyInfo.icon}
										{privacyInfo.text}
									</span>
								)}
							</div>
						</div>
					</div>

					<div className="flex gap-3">
						<Link
							href={`/calendars/${calendar.calendar_id}`}
							className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
						>
							Preview
						</Link>
						<button
							className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
							onClick={() => {
								navigator.clipboard.writeText(
									`${window.location.origin}/calendars/${calendar.calendar_id}`
								);
							}}
						>
							Copy Link
						</button>
					</div>
				</div>
			</section>

			<section className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
				<h2 className="text-xl font-bold text-red-300 mb-4 flex items-center gap-2">
					<Gift className="w-5 h-5 text-red-300" />
					All Doors
				</h2>
				<p className="text-white/70 mb-6">
					Click on any door to add or edit its content. Each door will
					be revealed on its corresponding day in December.
				</p>

				<div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
					{Array.from({ length: 24 }, (_, i) => {
						const door = doors[i];
						const hasFilled = door?.content?.trim();
						const isSelected = selectedDoor === i;
						return (
							<button
								key={i}
								onClick={() => openDoorEditor(i)}
								className={`aspect-square rounded-xl border-2 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex flex-col items-center justify-center gap-1 ${
									isSelected
										? "bg-red-500 border-red-300 ring-2 ring-red-300 scale-105"
										: hasFilled
										? "bg-green-600/80 border-green-400/50 hover:bg-green-500/80"
										: "bg-white/10 border-white/20 hover:bg-white/20"
								}`}
							>
								<span className="text-2xl font-bold text-white">
									{i + 1}
								</span>
								{hasFilled && !isSelected && (
									<Gift className="w-4 h-4 text-white/80" />
								)}
							</button>
						);
					})}
				</div>

				{selectedDoor !== null && (
					<div className="mt-6 pt-6 border-t border-white/20">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-bold text-white flex items-center gap-2">
								<Gift className="w-5 h-5 text-red-300" />
								Editing Door {selectedDoor + 1}
							</h3>
							<button
								onClick={closeDoorEditor}
								className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<label className="block text-white/80 mb-2 text-sm font-medium">
									Door Title
								</label>
								<input
									type="text"
									value={doorName}
									onChange={(e) =>
										setDoorName(e.target.value)
									}
									placeholder={`Day ${selectedDoor + 1}`}
									className="w-full bg-sky-500/50 px-4 py-3 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/30 focus:outline-none border border-white/10"
								/>
							</div>

							<div className="md:row-span-2">
								<label className="block text-white/80 mb-2 text-sm font-medium">
									Content
								</label>
								<textarea
									value={doorContent}
									onChange={(e) =>
										setDoorContent(e.target.value)
									}
									placeholder="Add a message, link, poem, or anything special for this day..."
									rows={5}
									className="w-full h-[calc(100%-28px)] bg-sky-500/50 px-4 py-3 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/30 focus:outline-none resize-none border border-white/10"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<p className="text-white/50 text-xs">
									Tip: You can add text, URLs, or even embed
									codes for images and videos.
								</p>
								<div className="flex gap-3 mt-auto">
									<button
										onClick={closeDoorEditor}
										className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all"
									>
										Cancel
									</button>
									<button
										onClick={saveDoor}
										disabled={saving}
										className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{saving ? "Saving..." : "Save"}
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</section>
		</main>
	);
}

export default CalendarDetailsPage;
