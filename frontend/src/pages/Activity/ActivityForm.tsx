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
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { getApiUrl } from "../../utils/getUrl";

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

    const url = `${getApiUrl()}/api/activity`;

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
      <Heading mb="30px" as="h1" size="4xl" textAlign="center">
        New Activity
      </Heading>

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
            <Tooltip label={selectedEnergyLevel}>
              <Box
                mb={5}
                p="50px"
                borderRadius="10px"
                backgroundColor={energyLevelColors[selectedEnergyLevel]}
              ></Box>
            </Tooltip>

            <FormControl my={5}>
              <FormLabel htmlFor="name" color="orange.800">
                Name:
              </FormLabel>
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
              <FormLabel htmlFor="feeling" color="orange.800">
                Feeling:
              </FormLabel>
              <Select
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

            <FormControl my={5}>
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
            <Center>
              <Button type="submit" mt={30}>
                Log Activity
              </Button>
            </Center>
          </div>
        ) : null}
      </Box>
    </Container>
  );
};
