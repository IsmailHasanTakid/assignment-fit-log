"use client"

import { FaRegBookmark, FaRegCalendarPlus, FaBookmark } from "react-icons/fa"
import { usePlan } from "@/context/PlanContext";
import { toast } from "react-toastify";

export default function ActionButtons({ data }) {
    const { addToPlan, saveForLater, todayPlan, saved } = usePlan();

    const isAdded = todayPlan.some((item) => item.id === data.id);
    const isSaved = saved.some((item) => item.id === data.id);

    const handleAddToPlan = () => {
        if (isAdded) {
            toast.error("Already added to plan!", { autoClose: 3000 });
            return;
        }
        addToPlan(data);
        toast.success("Added to today's plan!", { autoClose: 5000 });
    };

    const handleSave = () => {
        if (isSaved) {
            toast.error("Already saved!", { autoClose: 3000 });
            return;
        }
        saveForLater(data);
        toast.success("Saved for later!", { autoClose: 5000 });
    };

    return (
        <div className="flex items-center gap-4 pt-2">
            <button
                onClick={handleAddToPlan}
                className={`flex-1 font-bold py-3 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2 ${isAdded
                        ? "bg-gray-600 text-gray-300 cursor-not-allowed hover:opacity-100"
                        : "bg-[#ccff00] text-black hover:opacity-90"
                    }`}
            >
                <span><FaRegCalendarPlus /></span>
                {isAdded ? "Added" : "Add to today's plan"}
            </button>

            <button
                onClick={handleSave}
                className="border border-gray-700 bg-[#13161c] text-white font-medium py-3 px-4 rounded-xl text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2"
            >
                {isSaved ? <FaBookmark className="text-white" /> : <FaRegBookmark />} Save for later
            </button>
        </div>
    );
}