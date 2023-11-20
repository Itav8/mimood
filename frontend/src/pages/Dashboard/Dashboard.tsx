import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { NavBar } from "../../components/Nav/Navbar";

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

  useEffect(() => {
    const fetchMood = async () => {
      const url = `${import.meta.env.VITE_API_URL}/api/moods`;

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
          setMoods(data.mood);
        }
      } catch (e) {
        console.log("Error fetching mood list", e);
      }
    };

    const fetchActivity = async () => {
      const url = `${import.meta.env.VITE_API_URL}/api/activities`;

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
          setActivities(data.activity);
        }
      } catch (e) {
        console.log("Error fetching activity list", e);
      }
    };

    fetchMood();
    fetchActivity();
  }, [cookies.jwtToken]);

  return (
    <>
      <NavBar />
      <div>
        <h1>Dashboard</h1>
        <h2>My Moods</h2>
        {moods.length > 0 ? (
          moods.map((mood, id) => <h3 key={id}>{mood.energyLevel}</h3>)
        ) : (
          <h3>No Data</h3>
        )}

        <h2>My Activities</h2>
        {activities.length > 0 ? (
          activities.map((activity) => {
            return (
              <div key={activity.id}>
                <h3>{activity.name}</h3>
                <h3>{activity.energyLevel}</h3>
              </div>
            )
          })
        ) : (
          <h3>No Data</h3>
        )}
      </div>
    </>
  );
};
