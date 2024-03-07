import { Box, FormControl, FormLabel, Heading, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Mood } from "../Dashboard/Dashboard";

interface MoodEditForm {
  initalValues: Mood;
  // onClose: () => void;
}

export const EditMoodForm = (props: MoodEditForm) => {
  const [cookies] = useCookies(["jwtToken"]);
  const [editForm, setEditForm] = useState<Mood>(props.initalValues);

  return (
    <>
      <Heading mb="30px">Edit Mood</Heading>

      <Box as="form">
        <FormControl>
          <FormLabel htmlFor="energyLevel" color="orange.800">
            Energy Level:
          </FormLabel>
          <Select></Select>
        </FormControl>
      </Box>
      <div>
        {/* {props.id}
        {props.feeling}
        {props.description}
        {props.energyLevel} */}
      </div>
    </>
  );
};
