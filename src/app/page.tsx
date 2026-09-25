"use client"
import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import AllCards from "./components/AllCards/AllCards";

export default function Home() {

  const [fits, setFits] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!res.ok) throw new Error("Failed to load workouts");
        const data = await res.json();
        setFits(data);
      }
      catch (err) {
        setError("Couldn't load workouts. Please try again later.");
      }
      finally {
        setLoading(false)
      }


    };

    getData();
  }, []);


  return (
    <main>
      <Hero />

      <section id="library" className="px-4 md:px-8 py-10">
        <h2 className="text-2xl font-bold text-white uppercase">THE LIBRARY</h2>
        <p className="text-gray-400 mb-6">Twelve lifts covering every major muscle group.</p>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[#16181d] rounded-xl overflow-hidden animate-pulse">
                <div className="w-full h-64 bg-gray-800" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-20 bg-gray-700 rounded-full" />
                  <div className="h-5 w-32 bg-gray-700 rounded" />
                  <div className="h-3 w-24 bg-gray-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-400 text-center py-10">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fits.map((fit) => (
              <AllCards key={fit.id} workout={fit} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
