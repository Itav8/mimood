import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface Mood {
  id: string;
  feeling: string;
  energyLevel: string;
}

interface Activity {
  id: string;
  name: string;
  feeling: string;
  energyLevel: string;
}

export const Dashboard = () => {
  const [cookies] = useCookies(["jwtToken"]);
  const [moods, setMoods] = useState<Mood[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
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
          setMoods(data.moods);
          setActivities(data.activities)
        }
      } catch (e) {
        console.log("ERROR Fetch List", e);
      }
    };

    fetchData();
  }, [cookies.jwtToken]);

  console.log(activities);
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>My Moods</h2>
      {moods.map((mood, i) => (
        <h3 key={i}>{mood.energyLevel}</h3>
      ))}
      <h2>My Activities</h2>
      {activities.map((activity, i) => (
        <h3 key={i}>{activity.name}: {activity.energyLevel}</h3>
      ))}
    </div>
  );
};
