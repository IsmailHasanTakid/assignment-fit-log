"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type Exercise = {
    id: number;
    name: string;
    image: string;
    description?: string;
    equipment?: string;
    difficulty?: string;
    sets?: number;
    reps?: number;
    duration?: number;
    caloriesBurned?: number;
    rating?: number;
    muscleGroups?: string[];
    instructions?: string[];
};

type PlanContextType = {
    todayPlan: Exercise[];
    saved: Exercise[];
    doneIds: number[];

    addToPlan: (exercise: Exercise) => void;
    saveForLater: (exercise: Exercise) => void;
    removeFromPlan: (id: number) => void;
    removeFromSaved: (id: number) => void;
    toggleDone: (id: number) => void;
};

const PlanContext = createContext<PlanContextType | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
    const [todayPlan, setTodayPlan] = useState<Exercise[]>([]);
    const [saved, setSaved] = useState<Exercise[]>([]);
    const [doneIds, setDoneIds] = useState<number[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const storedPlan = localStorage.getItem("fitlog_todayPlan");
            const storedSaved = localStorage.getItem("fitlog_saved");
            const storedDone = localStorage.getItem("fitlog_doneIds");

            if (storedPlan) setTodayPlan(JSON.parse(storedPlan));
            if (storedSaved) setSaved(JSON.parse(storedSaved));
            if (storedDone) setDoneIds(JSON.parse(storedDone));
        } catch (err) {
            console.error("Failed to load plan from localStorage.", err);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem(
            "fitlog_todayPlan",
            JSON.stringify(todayPlan)
        );
    }, [todayPlan, isLoaded]);

    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem(
            "fitlog_saved",
            JSON.stringify(saved)
        );
    }, [saved, isLoaded]);

    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem(
            "fitlog_doneIds",
            JSON.stringify(doneIds)
        );
    }, [doneIds, isLoaded]);

    const addToPlan = (exercise: Exercise) => {
        setTodayPlan((prev) => {
            if (prev.find((item) => item.id === exercise.id)) {
                return prev;
            }

            return [...prev, exercise];
        });
    };

    const saveForLater = (exercise: Exercise) => {
        setSaved((prev) => {
            if (prev.find((item) => item.id === exercise.id)) {
                return prev;
            }

            return [...prev, exercise];
        });
    };

    const removeFromPlan = (id: number) => {
        setTodayPlan((prev) =>
            prev.filter((item) => item.id !== id)
        );

        setDoneIds((prev) =>
            prev.filter((doneId) => doneId !== id)
        );
    };

    const removeFromSaved = (id: number) => {
        setSaved((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    const toggleDone = (id: number) => {
        setDoneIds((prev) =>
            prev.includes(id)
                ? prev.filter((doneId) => doneId !== id)
                : [...prev, id]
        );
    };

    return (
        <PlanContext.Provider
            value={{
                todayPlan,
                saved,
                doneIds,
                addToPlan,
                saveForLater,
                removeFromPlan,
                removeFromSaved,
                toggleDone,
            }}
        >
            {children}
        </PlanContext.Provider>
    );
}

export function usePlan() {
    const context = useContext(PlanContext);

    if (!context) {
        throw new Error("usePlan must be used inside PlanProvider");
    }

    return context;
}