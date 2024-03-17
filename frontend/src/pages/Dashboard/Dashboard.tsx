import { useCallback, useEffect, useState } from "react";
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
  TabList,
  Tabs,
  Tab,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { EditMoodForm } from "../Mood/EditMoodForm";
import { EditActivityForm } from "../Activity/EditActivityForm";
import { getApiUrl } from "../../utils/getUrl";

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
  energyLevel: EnergyLevels | string;
}

export interface SelectedActivity {
  id?: string;
  name: string;
  feeling: string;
  description: string;
  energyLevel: EnergyLevels | string;
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
  const [selectedActivity, setSelectedActivity] = useState<SelectedActivity>({
    id: "",
    name: "",
    feeling: "",
    description: "",
    energyLevel: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const fetchMood = useCallback(async () => {
    const url = `${getApiUrl()}/api/moods?clientDate=${new Date().toLocaleDateString()}`;

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
  }, [cookies]);

  const fetchActivity = useCallback(async () => {
    const url = `${getApiUrl()}/api/activities?clientDate=${new Date().toLocaleDateString()}`;

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
  }, [cookies]);

  useEffect(() => {
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

    fetchMood();
    fetchActivity();
    fetchUserEnergyLevel();
  }, [cookies, fetchMood, fetchActivity]);

  const formatDatetime = (datetime: Date) => {
    const date = new Date(datetime);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <>
      <div>
        <Heading as="h1" size="2xl" textAlign="center">
          Dashboard
        </Heading>

        <Tabs>
          <TabList>
            <Tab>Today</Tab>
            <Tab>Previous Day</Tab>
          </TabList>
        </Tabs>

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
                        {formatDatetime(new Date(mood.createdDatetime))}
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
                        {formatDatetime(new Date(activity.createdDatetime))}
                      </Text>
                      <Text>{activity.feeling}</Text>
                      <Text mt="5px">{activity.description}</Text>
                      <Flex justifyContent="flex-end">
                        <Button
                          rightIcon={<EditIcon />}
                          onClick={() => {
                            setIsOpen(true);
                            setSelectedActivity(activity);
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
          setselectedMood({
            id: "",
            feeling: "",
            description: "",
            energyLevel: "",
          });
          setSelectedActivity({
            id: "",
            name: "",
            feeling: "",
            description: "",
            energyLevel: "",
          });
        }}
        size={"lg"}
      >
        <DrawerContent>
          <DrawerCloseButton />
          {selectedMood.id && !selectedActivity.id ? (
            <EditMoodForm
              initialValues={selectedMood}
              onSubmit={async () => {
                await fetchMood();
                setIsOpen(false);
              }}
            />
          ) : (
            <EditActivityForm
              initialValues={selectedActivity}
              onSubmit={async () => {
                await fetchActivity();
                setIsOpen(false);
              }}
            />
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
