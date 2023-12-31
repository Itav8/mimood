import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { EnergyLevels } from "../../constants/constants";

import "./EnergyLevel.css";

interface EnergyLevel {
  level: EnergyLevels;
  color: string;
}

interface EnergyLevelProps {
  onClick: (energyLevel: EnergyLevels) => void;
}

export const EnergyLevel = ({ onClick }: EnergyLevelProps) => {
  const [cookies] = useCookies(["jwtToken"]);
  const [energyLevels, setEnergylevels] = useState<EnergyLevel[]>([]);

  useEffect(() => {
    const fetchEnergyLevel = async () => {
      const url = `${import.meta.env.VITE_API_URL}/api/energyLevel`;

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
          setEnergylevels(data.energyLevel);
        }
      } catch (e) {
        console.log("Error fetching energy levels", e);
      }
    };
    fetchEnergyLevel();
  }, [cookies]);

  return (
    <div>
      <h1>How do you feel?</h1>
      <h4>(Tap the color best describes you)</h4>
      {energyLevels.map((energyLevel, i) => {
        return (
          <div
            key={i}
            className="energyLevel-container"
            onClick={() => {
              onClick(energyLevel.level);
            }}
          >
            {/* Add color for style */}
            {energyLevel.level}
          </div>
        );
      })}
    </div>
  );
};
