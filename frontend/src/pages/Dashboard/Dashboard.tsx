import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { EnergyLevels } from "../../constants/constants";
import { Box, Heading } from "@chakra-ui/react";

interface Mood {
  id: string;
  feeling: string;
  energyLevel: EnergyLevels;
}

interface Activity {
  id: string;
  name: string;
  feeling: string;
  energyLevel: EnergyLevels;
}

type UserEnergyLevel = {
  [key in EnergyLevels]: string;
};

export const Dashboard = () => {
  const [cookies] = useCookies(["jwtToken"]);
  const [moods, setMoods] = useState<Mood[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [energyLevelColors, setEnergyLevelColors] = useState<UserEnergyLevel>({
    HIGH_ENERGY_UNPLEASANT: "#000000",
    HIGH_ENERGY_PLEASANT: "#000000",
    LOW_ENERGY_UNPLEASANT: "#000000",
    LOW_ENERGY_PLEASANT: "#000000",
  });

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

    const fetchUserEnergyLevel = async () => {
      const url = `${import.meta.env.VITE_API_URL}/api/userEnergyLevel`;
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
          const userColor = data.userColor.reduce(
            (accum: Record<string, string>, key: Record<string, string>) => {
              accum[key.energyLevel] = key.color;
              return accum;
            },
            {}
          );
          setEnergyLevelColors(userColor);
        }
      } catch (e) {
        console.log("Error fetching userEnergyLevels list", e);
      }
    };

    fetchMood();
    fetchActivity();
    fetchUserEnergyLevel();
  }, [cookies]);
  return (
    <>
      <div>
        <Heading as="h1" size="2xl" textAlign='center'>
          Dashboard
        </Heading>
        <Heading as="h2">My Moods</Heading>
        {moods.length > 0 ? (
          moods.map((mood, id) => {
            return (
              <Box
                as="div"
                key={id}
                w="100%"
                h="30px"
                my="1px"
                cursor="pointer"
                bgColor={energyLevelColors[mood.energyLevel]}
                _hover={{
                  boxShadow: "-2px 3px 21px 15px rgba(255,255,255,1)",
                }}
              />
            );
          })
        ) : (
          <h3>No Data</h3>
        )}

        <Heading as="h2">My Activities</Heading>
        {activities.length > 0 ? (
          activities.map((activity) => {
            return (
              <div key={activity.id}>
                <h3>{activity.name}</h3>
                <h3
                  style={{
                    backgroundColor: energyLevelColors[activity.energyLevel],
                  }}
                >
                  {activity.energyLevel}
                </h3>
              </div>
            );
          })
        ) : (
          <h3>No Data</h3>
        )}
      </div>
    </>
  );
};
