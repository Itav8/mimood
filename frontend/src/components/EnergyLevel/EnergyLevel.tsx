import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { EnergyLevels } from "../../constants/constants";
import { Box, Center, Heading, SimpleGrid, Tooltip } from "@chakra-ui/react";
import { getApiUrl } from "../../utils/getUrl";

import "./EnergyLevel.css";

export interface EnergyLevel {
  level: EnergyLevels;
  color: string;
}

interface EnergyLevelProps {
  onClick: (energyLevel: EnergyLevels) => void;
}

type UserEnergyLevel = {
  [key in EnergyLevels]: string;
};

export const EnergyLevel = ({ onClick }: EnergyLevelProps) => {
  const [cookies] = useCookies(["jwtToken"]);
  const [energyLevels, setEnergylevels] = useState<EnergyLevel[]>([]);
  const [energyLevelColors, setEnergyLevelColors] = useState<UserEnergyLevel>({
    HIGH_ENERGY_UNPLEASANT: "#000000",
    HIGH_ENERGY_PLEASANT: "#000000",
    LOW_ENERGY_UNPLEASANT: "#000000",
    LOW_ENERGY_PLEASANT: "#000000",
  });

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

    fetchUserEnergyLevel();
    fetchEnergyLevel();
  }, [cookies]);

  return (
    <>
      <Center>
        <Box>
          <Heading as="h3" size="lg">
            How do you feel?
          </Heading>
          <Heading as="h4" size="sm" mb="20px">
            (Tap the color best describes you)
          </Heading>

          <SimpleGrid columns={2} spacing={15} width="fit-content">
            {energyLevels.map((energyLevel, i) => {
              return (
                <Tooltip
                  label={energyLevel.level}
                  fontSize={"md"}
                >
                  <Box
                    width={{ base: "115px", md: "215px", sm: "165px" }}
                    height={{ base: "115px", md: "215px", sm: "165px" }}
                    borderRadius="50%"
                    bg={energyLevelColors[energyLevel.level]}
                    key={i}
                    _hover={{
                      transform: "scale(1.05, 1.05)",
                    }}
                    className="energyLevel-container"
                    onClick={() => {
                      onClick(energyLevel.level);
                    }}
                    display="flex"
                    alignItems="center"
                    textAlign="center"
                  ></Box>
                </Tooltip>
              );
            })}
          </SimpleGrid>
        </Box>
      </Center>
    </>
  );
};
