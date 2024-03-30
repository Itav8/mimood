import { useCookies } from "react-cookie";
import { EnergyLevel } from "../../components/EnergyLevel/EnergyLevel";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnergyLevels, EnergyLevelsMap } from "../../constants/constants";
import {
  Box,
  Button,
  Center,
  Collapse,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { getApiUrl } from "../../utils/getUrl";

interface MoodForm {
  feeling: string;
  description: string;
  energyLevel?: EnergyLevels;
}

type UserEnergyLevel = {
  [key in EnergyLevels]: string;
};

export const MoodForm = () => {
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
  const [form, setForm] = useState<MoodForm>({
    feeling: "",
    description: "",
    energyLevel: selectedEnergyLevel,
  });
  const { isOpen, onToggle } = useDisclosure();

  const onEnergyLevelClick = (energyLevel: EnergyLevels) => {
    setSelectedEnergyLevel(energyLevel);

    const fetchEnergyLevelFeelings = async (energyLevel: EnergyLevels) => {
      const url = `${getApiUrl()}/api/energyLevel/${energyLevel}`;

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
      const url = `${getApiUrl()}/api/userEnergyLevel`;
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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

    const url = `${getApiUrl()}/api/mood`;

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
    <Container>
      <Heading mb="30px">New Mood</Heading>

      {!selectedEnergyLevel ? (
        <EnergyLevel onClick={onEnergyLevelClick} />
      ) : null}

      <Box as="form" onSubmit={handleSubmit}>
        {selectedEnergyLevel ? (
          <div>
            <Button mb={30} onClick={onToggle}>
              Change Energy Level
            </Button>
            <Collapse
              in={isOpen}
              transition={{ exit: { duration: 0.5 }, enter: { duration: 0.5 } }}
            >
              <Center onClick={onToggle}>
                <Box mb={30}>
                  <EnergyLevel onClick={onEnergyLevelClick} />
                </Box>
              </Center>
            </Collapse>
            <Box
              p="10px"
              borderRadius="10px"
              backgroundColor={energyLevelColors[selectedEnergyLevel]}
            >
              <Text fontSize="sm">{selectedEnergyLevel}</Text>
            </Box>
            <FormControl>
              <FormLabel htmlFor="feeling" color="orange.800">
                Feeling:
              </FormLabel>
              <Select
                mt={3}
                id="feeling"
                name="feeling"
                placeholder="Select a feeling"
                onChange={handleFormChange}
              >
                {selectedFeelings.map((selectedFeeling, i) => {
                  return <option key={i}>{selectedFeeling.feelings}</option>;
                })}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="description" color="orange.800">
                Description:
              </FormLabel>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleFormChange}
              />
            </FormControl>

            <Button type="submit" mt={3}>
              Log Mood
            </Button>
          </div>
        ) : null}
      </Box>
    </Container>
  );
};
