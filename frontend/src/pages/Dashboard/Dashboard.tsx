import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface Mood {
  id: string;
  feeling: string;
  energyLevel: string;
}

export const Dashboard = () => {
  const [cookies] = useCookies(["jwtToken"]);
  const [moods, setMoods] = useState<Mood[]>([])
  // const [activities, setActivities] = useState([])
  console.log("WTF", cookies.jwtToken);


  useEffect(() => {
    const fetchData = async () => {
      const url = `${import.meta.env.VITE_API_URL}/api/moods/activities`;

      const fetchConfig: RequestInit = {
        headers: {
          Authorization: `Bearer ${cookies.jwtToken}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await fetch(url, fetchConfig);

        if (response.ok) {
          const data = await response.json();
          setMoods(data.moods)
        }
      } catch (e) {
        console.log("ERROR Fetch List", e);
      }
    };

    fetchData();
  }, [cookies.jwtToken]);

  console.log(moods)
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>My Moods</h2>
      {moods.map((mood, i) =>
        <h3 key={i} >{mood.energyLevel}</h3>
      )}
      <h2>My Activities</h2>
    </div>
  );
};
