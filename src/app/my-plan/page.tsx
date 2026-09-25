"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { CiCircleRemove } from "react-icons/ci";

export default function MyPlanPage() {
    const { todayPlan, saved, removeFromPlan, removeFromSaved, doneIds, toggleDone } = usePlan();
    const [tab, setTab] = useState("today");
    const [sortBy, setSortBy] = useState("duration"); // duration | calories | rating

    const rawList = tab === "today" ? todayPlan : saved;

    const list = useMemo(() => {
        const sorted = [...rawList];

        if (sortBy === "duration") {
            sorted.sort(
                (a, b) =>
                    (Number(a.duration) - (Number(b.duration) || 0) || 0));
        } else if (sortBy === "calories") {
            sorted.sort(
                (a, b) => (Number(b.caloriesBurned) || 0) - (Number(a.caloriesBurned) || 0)
            );
        } else if (sortBy === "rating") {
            sorted.sort(
                (a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0)
            );
        }

        return sorted;
    }, [rawList, sortBy]);

    const totalMinutes = todayPlan.reduce((sum, ex) => sum + (Number(ex.duration) || 0), 0);
    const totalCalories = todayPlan.reduce((sum, ex) => sum + (Number(ex.caloriesBurned) || 0), 0);



    return (
        <main className="min-h-screen bg-[#0d0f12] text-white p-6 md:p-12">
            <h1 className="text-3xl font-extrabold">MY PLAN</h1>
            <p className="text-gray-400 text-sm mb-6">Cap of five lifts for today. Finish them, then load more.</p>

            <div className="bg-[#13161c] rounded-xl p-6 flex justify-between mb-6 border border-gray-800">
                <div>
                    <p className="text-gray-400 text-xs uppercase">Exercises</p>
                    <p className="text-2xl font-bold text-[#ccff00]">{todayPlan.length}</p>
                </div>
                <div>
                    <p className="text-gray-400 text-xs uppercase">Minutes</p>
                    <p className="text-2xl font-bold">{totalMinutes}</p>
                </div>
                <div>
                    <p className="text-gray-400 text-xs uppercase">Calories</p>
                    <p className="text-2xl font-bold">{totalCalories}</p>
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => setTab("today")}
                        className={`px-4 py-2 rounded-lg text-sm ${tab === "today" ? "bg-[#1c2028]" : "text-gray-400"}`}
                    >
                        Today's Plan
                    </button>
                    <button
                        onClick={() => setTab("saved")}
                        className={`px-4 py-2 rounded-lg text-sm ${tab === "saved" ? "bg-[#1c2028]" : "text-gray-400"}`}
                    >
                        Saved
                    </button>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Sort By</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-[#13161c] border border-gray-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none"
                    >
                        <option value="duration">Duration</option>
                        <option value="calories">Calories</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
            </div>

            <div className="bg-[#13161c] rounded-xl border border-gray-800 p-6">
                {list.length === 0 ? (
                    <div className="text-center py-16">
                        <h2 className="font-bold uppercase">Nothing here yet</h2>
                        <p className="text-gray-400 text-sm mt-1 mb-5">Browse the library and add a lift to get today moving.</p>
                        <Link className="rounded-full text-black px-4 py-2.5 bg-[#ccff00]" href="/">Go To workouts</Link>
                    </div>
                ) : (
                    list.map((ex) => {
                        const isDone = doneIds.includes(ex.id);
                        return (
                            <div
                                key={ex.id}
                                className={`flex justify-between items-center py-3 border-b border-gray-800 last:border-0 ${isDone ? "opacity-50" : ""}`}
                            >
                                <div className="flex items-center gap-3">
                                    <img src={ex.image} alt={ex.name} className="w-14 h-14 rounded-lg object-cover" />
                                    <div>
                                        <p className={`font-bold ${isDone ? "line-through" : ""}`}>{ex.name}</p>
                                        <p className="text-gray-400 text-xs">{ex.equipment}</p>
                                        <p className="text-gray-400 text-xs flex gap-2 mt-1">
                                            <span>⏱ {ex.duration} min</span>
                                            <span>🔥 {ex.caloriesBurned} kcal</span>
                                            <span>⭐ {ex.rating}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Link
                                        href={`/details/${ex.id}`}
                                        className="border border-gray-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                                    >
                                        View Details
                                    </Link>

                                    {tab === "today" && (
                                        <button
                                            onClick={() => toggleDone(ex.id)}
                                            className={`text-sm px-4 py-2 rounded-lg font-semibold transition ${isDone
                                                ? "bg-gray-700 text-gray-300"
                                                : "bg-[#ccff00] text-black hover:opacity-90"
                                                }`}
                                        >
                                            {isDone ? "✓ Done" : "✓ Mark as Done"}
                                        </button>
                                    )}

                                    <button
                                        onClick={() => (tab === "today" ? removeFromPlan(ex.id) : removeFromSaved(ex.id))}
                                        className="text-gray-400 hover:text-white text-lg"
                                    >
                                        <CiCircleRemove />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </main>
    );
}