import { useCookies } from "react-cookie";
import { EnergyLevel } from "../../components/EnergyLevel/EnergyLevel";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnergyLevels, EnergyLevelsMap } from "../../constants/constants";

interface MoodForm {
  feeling: string;
  description: string;
  energyLevel?: EnergyLevels;
}

export const MoodForm = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["jwtToken"]);
  const [selectedFeelings, setSelectedFeelings] = useState<Array<unknown>>([]);
  const [selectedEnergyLevel, setSelectedEnergyLevel] =
    useState<EnergyLevels>();
  const [form, setForm] = useState<MoodForm>({
    feeling: "",
    description: "",
    energyLevel: selectedEnergyLevel,
  });

  const onEnergyLevelClick = (energyLevel: EnergyLevels) => {
    setSelectedEnergyLevel(energyLevel);
  };

  const fetchEnergyLevelFeelings = async (energyLevel: EnergyLevels) => {
    const url = `${
      import.meta.env.VITE_API_URL
    }/api/energyLevel/${energyLevel}`;

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

        console.log(data.feeling[EnergyLevelsMap[energyLevel]]);
      }
    } catch (e) {
      console.log("Error fetching feelings", e);
    }
  };

  selectedEnergyLevel && fetchEnergyLevelFeelings(selectedEnergyLevel);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setForm({
      ...form,
      [inputName]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `${import.meta.env.VITE_API_URL}/api/mood`;

    const data: MoodForm = {
      feeling: form.feeling,
      description: form.description,
      energyLevel: selectedEnergyLevel,
    };

    const fetchConfig: RequestInit = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${cookies.jwtToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, fetchConfig);

      if (response.ok) {
        setForm({
          feeling: "",
          description: "",
        });

        navigate("/dashboard");
      }
    } catch (e) {
      console.log("Error logging mood", e);
    }
  };

  return (
    <div>
      <h1>New Mood</h1>
      <EnergyLevel onClick={onEnergyLevelClick} />
      <form onSubmit={handleSubmit}>
        {selectedEnergyLevel ? (
          <div>{selectedEnergyLevel}</div>
        ) : (
          <div>No Energy Level Selected</div>
        )}

        <div>
          <label htmlFor="feeling">Feeling:</label>
          <input
            type="text"
            id="feeling"
            name="feeling"
            value={form.feeling}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={form.description}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <button>Log Mood</button>
        </div>
      </form>
    </div>
  );
};
