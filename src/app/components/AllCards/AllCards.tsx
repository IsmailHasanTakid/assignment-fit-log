import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

type Workout = {
    id: number;
    name: string;
    image: string;
    muscleGroups: string[];
    equipment: string;
    duration: number;
    caloriesBurned: number;
    rating: number;
};

type AllCardsProps = {
    workout: Workout;
};

const AllCards = ({ workout }: AllCardsProps) => {
    const {
        id,
        name,
        image,
        muscleGroups,
        equipment,
        duration,
        caloriesBurned,
        rating,
    } = workout;

    return (
        <Link
            href={`/details/${id}`}
            className="block bg-[#16181d] rounded-xl overflow-hidden hover:-translate-y-1 transition"
        >
            <div className="relative w-full h-75">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover object-[center_20%]"
                />
            </div>

            <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-3">
                    {muscleGroups.map((group) => (
                        <span
                            key={group}
                            className="bg-[#ccff00] text-black text-xs font-bold uppercase px-3 py-1 rounded-full"
                        >
                            {group}
                        </span>
                    ))}
                </div>

                <h3 className="text-white font-bold text-lg uppercase">
                    {name}
                </h3>

                <p className="text-gray-400 text-sm mb-3">
                    {equipment}
                </p>

                <div className="border-t border-gray-800 pt-3 flex items-center gap-4 text-gray-300 text-sm">
                    <span className="flex items-center gap-1">
                        <Clock size={14} /> {duration} min
                    </span>

                    <span className="flex items-center gap-1">
                        <Flame size={14} /> {caloriesBurned} kcal
                    </span>

                    <span className="flex items-center gap-1">
                        <Star size={14} /> {rating}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default AllCards;