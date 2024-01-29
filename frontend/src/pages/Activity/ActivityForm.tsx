import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { EnergyLevels, EnergyLevelsMap } from "../../constants/constants";
import { EnergyLevel } from "../../components/EnergyLevel/EnergyLevel";
import { Container, Heading } from "@chakra-ui/react";

interface ActivityForm {
  name: string;
  feeling: string;
  energyLevel?: EnergyLevels;
  description: string;
}

type UserEnergyLevel = {
  [key in EnergyLevels]: string;
};

export const ActivityForm = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["jwtToken"]);
  const [energyLevelColors, setEnergyLevelColors] = useState<UserEnergyLevel>({
    HIGH_ENERGY_UNPLEASANT: "#000000",
    HIGH_ENERGY_PLEASANT: "#000000",
    LOW_ENERGY_UNPLEASANT: "#000000",
    LOW_ENERGY_PLEASANT: "#000000",
  });
  const [selectedFeelings, setSelectedFeelings] = useState<
    Array<Record<string, string>>
  >([]);
  const [selectedEnergyLevel, setSelectedEnergyLevel] =
    useState<EnergyLevels>();
  const [form, setForm] = useState<ActivityForm>({
    name: "",
    feeling: "",
    energyLevel: selectedEnergyLevel,
    description: "",
  });

  const onEnergyLevelClick = (energyLevel: EnergyLevels) => {
    setSelectedEnergyLevel(energyLevel);

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

          setSelectedFeelings(data.feelings[EnergyLevelsMap[energyLevel]]);
        }
      } catch (e) {
        console.log("Error fetching feelings", e);
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

    fetchEnergyLevelFeelings(energyLevel);
    fetchUserEnergyLevel();
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setForm({
      ...form,
      [inputName]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `${import.meta.env.VITE_API_URL}/api/activity`;

    const data: ActivityForm = {
      name: form.name,
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
          name: "",
          feeling: "",
          description: "",
        });

        navigate("/dashboard");
      }
    } catch (e) {
      console.log("Error logging activity", e);
    }
  };

  return (
    <Container>
      <Heading mb="30px">New Activity</Heading>
      {!selectedEnergyLevel ? (
        <EnergyLevel onClick={onEnergyLevelClick} />
      ) : null}

      <form onSubmit={handleSubmit}>
        {selectedEnergyLevel ? (
          <div>
            <div
              style={{
                backgroundColor: energyLevelColors[selectedEnergyLevel],
              }}
            >
              {selectedEnergyLevel}
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <select id="feeling" name="feeling" onChange={handleFormChange}>
                <option value="">Choose a feeling...</option>
                {selectedFeelings.map((selectedFeeling, i) => {
                  return <option key={i}>{selectedFeeling.feelings}</option>;
                })}
              </select>
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
                <button>Log Activity</button>
              </div>
            </div>
          </div>
        ) : null}
      </form>
    </Container>
  );
};
