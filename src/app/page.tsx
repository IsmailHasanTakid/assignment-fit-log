"use client"
import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import AllCards from "./components/AllCards/AllCards";

export default function Home() {

  const [fits, setFits] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        const data = await res.json();
        setFits(data);
      }
      catch (error) {
        console.log(error);
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
          <p className="text-gray-400">Loading workouts…</p>
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
