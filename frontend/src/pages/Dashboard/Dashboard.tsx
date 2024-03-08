import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { EnergyLevels } from "../../constants/constants";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Stack,
  Text,
  Tooltip,
  Image,
  Center,
  Button,
  Flex,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { EditMoodForm } from "../Mood/EditMoodForm";

interface Mood {
  id: string;
  feeling: string;
  description: string;
  energyLevel: EnergyLevels;
  createdDatetime: string;
}

export interface SelectedMood {
  id?: string;
  feeling: string;
  description: string;
  energyLevel: string;
}

interface Activity {
  id: string;
  name: string;
  feeling: string;
  description: string;
  energyLevel: EnergyLevels;
  createdDatetime: string;
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
  const [selectedMood, setselectedMood] = useState<SelectedMood>({
    id: "",
    feeling: "",
    description: "",
    energyLevel: "",
  });
  const [isOpen, setIsOpen] = useState(false);

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
        <Heading as="h1" size="2xl" textAlign="center">
          Dashboard
        </Heading>
        <Heading as="h2" my="20px" ml="10px">
          My Moods
        </Heading>

        {moods.length > 0 ? (
          moods.map((mood, id) => {
            return (
              <Accordion allowToggle key={id}>
                <AccordionItem>
                  <Tooltip label={mood.energyLevel}>
                    <AccordionButton bg={energyLevelColors[mood.energyLevel]}>
                      <Box as="span" w="100%" h="30px" />
                      <AccordionIcon />
                    </AccordionButton>
                  </Tooltip>

                  <AccordionPanel bg={energyLevelColors[mood.energyLevel]}>
                    <Box>
                      <Text align="right">
                        {new Date(mood.createdDatetime).toLocaleString()}
                      </Text>
                      <Text>{mood.feeling}</Text>
                      <Text mt="5px">{mood.description}</Text>
                      <Flex justifyContent="flex-end">
                        <Button
                          rightIcon={<EditIcon />}
                          onClick={() => {
                            setIsOpen(true);
                            setselectedMood(mood);
                          }}
                        >
                          Edit
                        </Button>
                      </Flex>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            );
          })
        ) : (
          <Stack boxSize="sm">
            <Center>
              <Image
                boxSize="150px"
                src="https://hortovanyi.files.wordpress.com/2021/12/no-data-icon-10.jpeg?w=250"
                alt="No Data"
              />
            </Center>
          </Stack>
        )}

        <Heading as="h2" my="20px" ml="10px">
          My Activities
        </Heading>
        {activities.length > 0 ? (
          activities.map((activity) => {
            return (
              <Accordion allowToggle key={activity.id}>
                <AccordionItem>
                  <Tooltip label={activity.energyLevel}>
                    <AccordionButton
                      bg={energyLevelColors[activity.energyLevel]}
                    >
                      <Box as="span" w="100%" h="30px" textAlign="left">
                        <Text ml="10px" fontSize="sm" as="i">
                          {activity.name}
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </Tooltip>

                  <AccordionPanel bg={energyLevelColors[activity.energyLevel]}>
                    <Box>
                      <Text align="right">
                        {new Date(activity.createdDatetime).toLocaleString()}
                      </Text>
                      <Text>{activity.feeling}</Text>
                      <Text mt="5px">{activity.description}</Text>
                      <Flex justifyContent="flex-end">
                        <Button
                          rightIcon={<EditIcon />}
                          onClick={() => {
                            setIsOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                      </Flex>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            );
          })
        ) : (
          <Stack boxSize="sm">
            <Center>
              <Image
                boxSize="150px"
                src="https://hortovanyi.files.wordpress.com/2021/12/no-data-icon-10.jpeg?w=250"
                alt="No Data"
              />
            </Center>
          </Stack>
        )}
      </div>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => {
          setIsOpen(false);
        }}
        size={"lg"}
      >
        <DrawerContent>
          <DrawerCloseButton />
          <EditMoodForm initalValues={selectedMood} />
          {/* <EditActivityForm id={activityId} /> */}
        </DrawerContent>
      </Drawer>
    </>
  );
};
