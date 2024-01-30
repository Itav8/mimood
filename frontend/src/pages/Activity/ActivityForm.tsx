import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { EnergyLevels, EnergyLevelsMap } from "../../constants/constants";
import { EnergyLevel } from "../../components/EnergyLevel/EnergyLevel";
import {
  Box,
  Button,
  Center,
  Collapse,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

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
  const { isOpen, onToggle } = useDisclosure();

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

      <Box as="form" onSubmit={handleSubmit}>
        {selectedEnergyLevel ? (
          <div>
            <Button mb={30} onClick={onToggle}>
              Change Energy Level
            </Button>
            <Collapse
              in={isOpen}
              transition={{ exit: { delay: 1 }, enter: { duration: 0.5 } }}
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
              {selectedEnergyLevel}
            </Box>
            <FormControl my={5}>
              <FormLabel htmlFor="name">Name:</FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                placeholder="Enter an activity"
              />
            </FormControl>

            <FormControl my={5}>
              <FormLabel htmlFor="feeling">Feeling:</FormLabel>
              <Select
                placeholder="Select a feeling"
                onChange={handleFormChange}
              >
                {selectedFeelings.map((selectedFeeling, i) => {
                  return <option key={i}>{selectedFeeling.feelings}</option>;
                })}
              </Select>
            </FormControl>

            <FormControl my={5}>
              <FormLabel htmlFor="description">Description:</FormLabel>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleFormChange}
              />
            </FormControl>
            <Button type="submit" mt={30}>
              Log Activity
            </Button>
          </div>
        ) : null}
      </Box>
    </Container>
  );
};
