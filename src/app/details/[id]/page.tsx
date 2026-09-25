import Image from "next/image";
import { FaRegBookmark, FaRegCalendarPlus } from "react-icons/fa";
import ActionButtons from "./ActionButtons";
export default async function DetailsPage({ params }) {
    const { id } = await params;

    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
    const data = await res.json();

    if (!res.ok) {
        return <h2 className="text-center p-10">Id not found....</h2>
    }

    return (
        <main className="min-h-screen bg-[#0d0f12] text-white p-6 md:p-12 flex justify-center items-center">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg border border-gray-800">
                    <Image
                        src={data.image}
                        alt={data.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide">
                            {data.name}
                        </h1>
                        <p className="text-gray-400 mt-2 text-sm md:text-base leading-relaxed">
                            {data.description}
                        </p>

                        <div className="flex gap-2 mt-4">
                            {data.muscleGroups?.map((group, index) => (
                                <span
                                    key={index}
                                    className="bg-[#ccff00] text-black font-semibold text-xs px-3 py-1 rounded-full uppercase"
                                >
                                    {group}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#13161c] rounded-xl p-4 divide-y divide-gray-800 border border-gray-800/50">
                        <div className="flex justify-between py-2 text-sm">
                            <span className="text-gray-400 uppercase text-xs font-semibold">Equipment</span>
                            <span className="font-medium">{data.equipment}</span>
                        </div>
                        <div className="flex justify-between py-2 text-sm">
                            <span className="text-gray-400 uppercase text-xs font-semibold">Difficulty</span>
                            <span className="font-medium">{data.difficulty}</span>
                        </div>
                        <div className="flex justify-between py-2 text-sm">
                            <span className="text-gray-400 uppercase text-xs font-semibold">Sets</span>
                            <span className="font-medium">{data.sets}</span>
                        </div>
                        <div className="flex justify-between py-2 text-sm">
                            <span className="text-gray-400 uppercase text-xs font-semibold">Reps</span>
                            <span className="font-medium">{data.reps}</span>
                        </div>
                        <div className="flex justify-between py-2 text-sm">
                            <span className="text-gray-400 uppercase text-xs font-semibold">Duration</span>
                            <span className="font-medium">{data.duration} min</span>
                        </div>
                        <div className="flex justify-between py-2 text-sm">
                            <span className="text-gray-400 uppercase text-xs font-semibold">Calories</span>
                            <span className="font-medium">{data.caloriesBurned} kcal</span>
                        </div>
                        <div className="flex justify-between py-2 text-sm">
                            <span className="text-gray-400 uppercase text-xs font-semibold">Rating</span>
                            <span className="font-medium">{data.rating}</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
                            Instructions
                        </h2>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                            {data.instructions?.map((step, index) => (
                                <li key={index} className="leading-relaxed">
                                    <span className="ml-1">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <ActionButtons data={data} />

                </div>
            </div>
        </main>
    );
}