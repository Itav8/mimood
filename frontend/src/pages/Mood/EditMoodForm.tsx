import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Radio,
  RadioGroup,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { SelectedMood } from "../Dashboard/Dashboard";
import { EnergyLevel } from "../../components/EnergyLevel/EnergyLevel";
import { EnergyLevels, EnergyLevelsMap } from "../../constants/constants";
import { getApiUrl } from "../../utils/getUrl";

interface MoodEditForm {
  initialValues: SelectedMood;
  onSubmit: () => void;
}

type UserEnergyLevel = {
  [key in EnergyLevels]: string;
};

export const EditMoodForm = (props: MoodEditForm) => {
  const [cookies] = useCookies(["jwtToken"]);
  const [editForm, setEditForm] = useState<SelectedMood>(props.initialValues);
  const [selectedFeelings, setSelectedFeelings] = useState<
    Array<Record<string, string>>
  >([]);
  const [selectedEnergyLevel, setSelectedEnergyLevel] =
    useState<EnergyLevels>();
  const [energyLevels, setEnergylevels] = useState<EnergyLevel[]>([]);
  const [energyLevelColors, setEnergyLevelColors] = useState<UserEnergyLevel>({
    HIGH_ENERGY_UNPLEASANT: "#000000",
    HIGH_ENERGY_PLEASANT: "#000000",
    LOW_ENERGY_UNPLEASANT: "#000000",
    LOW_ENERGY_PLEASANT: "#000000",
  });

  const fetchEnergyLevelFeelings = useCallback(
    async (energyLevel: EnergyLevels | string) => {
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
          setSelectedFeelings(
            data.feelings[EnergyLevelsMap[energyLevel as EnergyLevels]]
          );
        }
      } catch (e) {
        console.log("Error fetching feelings", e);
      }
    },
    [cookies]
  );

  useEffect(() => {
    const fetchEnergyLevel = async () => {
      const url = `${getApiUrl()}/api/energyLevel`;

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

    fetchEnergyLevelFeelings(props.initialValues.energyLevel);
    fetchUserEnergyLevel();
    fetchEnergyLevel();
  }, [cookies, fetchEnergyLevelFeelings, props.initialValues.energyLevel]);

  const onEnergyLevelClick = async (energyLevel: EnergyLevels) => {
    setSelectedEnergyLevel(energyLevel);
    fetchEnergyLevelFeelings(energyLevel);
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setEditForm({
      ...editForm,
      [inputName]: value,
    });
  };

  const handleEditSubmit = async (
    e: React.FormEvent<HTMLDivElement>,
    moodId: string | undefined
  ) => {
    e.preventDefault();

    const url = `${getApiUrl()}/api/moods/${moodId}`;

    const data: SelectedMood = {
      feeling: editForm?.feeling,
      description: editForm?.description,
      energyLevel: selectedEnergyLevel as EnergyLevels,
    };

    const fetchConfig: RequestInit = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${cookies.jwtToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, fetchConfig);

      if (response.ok) {
        setEditForm({
          feeling: "",
          description: "",
          energyLevel: "",
        });
        props.onSubmit();
      }
    } catch (e) {
      console.log("Error editing mood", e);
    }
  };

  return (
    <>
      <Heading mb="30px" mt={10} as="h1" size="4xl" textAlign="center">
        Edit Mood
      </Heading>

      <Box
        as="form"
        margin={3}
        onSubmit={(e: React.FormEvent<HTMLDivElement>) => {
          handleEditSubmit(e, editForm.id);
        }}
      >
        <FormControl>
          <FormLabel htmlFor="energyLevel" color="orange.800">
            Energy Level:
          </FormLabel>
          <RadioGroup defaultValue={editForm.energyLevel}>
            {energyLevels.map((energyLevel, i) => {
              return (
                <Button
                  onChange={() => {
                    handleFormChange;
                  }}
                  onClick={() => {
                    onEnergyLevelClick(energyLevel.level);
                  }}
                  key={i}
                  m={2}
                  variant="ghost"
                  backgroundColor={energyLevelColors[energyLevel.level]}
                  _checked={{
                    borderColor: energyLevelColors[energyLevel.level],
                  }}
                  _focus={{
                    boxShadow: "outline",
                  }}
                >
                  <Radio value={energyLevel.level}>{energyLevel.level}</Radio>
                </Button>
              );
            })}
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="feeling" color="orange.800">
            Feeling:
          </FormLabel>
          <Select
            mb={3}
            id="feeling"
            name="feeling"
            value={editForm.feeling}
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
            value={editForm.description}
            onChange={handleFormChange}
          />
        </FormControl>
        <Center>
          <Button type="submit" mt={5}>
            Update Mood
          </Button>
        </Center>
      </Box>
    </>
  );
};
