"use client";
import { createContext, useContext, useState } from "react";

const PlanContext = createContext(null);

export function PlanProvider({ children }) {
    const [todayPlan, setTodayPlan] = useState([]);
    const [saved, setSaved] = useState([]);
    const [doneIds, setDoneIds] = useState([]);

    const addToPlan = (exercise) => {
        setTodayPlan((prev) => {
            if (prev.find((item) => item.id === exercise.id)) return prev;
            if (prev.length >= 5) return prev;
            return [...prev, exercise];
        });
    };

    const saveForLater = (exercise) => {
        setSaved((prev) => {
            if (prev.find((item) => item.id === exercise.id)) return prev;
            return [...prev, exercise];
        });
    };

    const removeFromPlan = (id) => {
        setTodayPlan((prev) => prev.filter((item) => item.id !== id));
        setDoneIds((prev) => prev.filter((doneId) => doneId !== id));
    };

    const removeFromSaved = (id) => {
        setSaved((prev) => prev.filter((item) => item.id !== id));
    };

    const toggleDone = (id) => {
        setDoneIds((prev) =>
            prev.includes(id) ? prev.filter((doneId) => doneId !== id) : [...prev, id]
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
    return useContext(PlanContext);
}