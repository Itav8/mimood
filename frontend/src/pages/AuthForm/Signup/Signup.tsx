import { EmailIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Box,
  InputRightElement,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../../utils/getUrl";

interface SignupProps {
  onSubmit: () => void;
}

interface SignupForm {
  firstName: string;
  lastName: string;
  color: string;
  email: string;
  password: string;
}

export const Signup = (props: SignupProps) => {
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState<SignupForm>({
    firstName: "",
    lastName: "",
    color: "rgb(0,0,0)",
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    firstName: false,
    lastName: false,
    color: false,
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setSignupForm({
      ...signupForm,
      [inputName]: value,
    });
  };

  const isFormValid = (form: SignupForm) => {
    const { firstName, lastName, email, password } = form;

    const error = {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
    };

    if (!firstName) {
      error.firstName = true;
    }

    if (!lastName) {
      error.lastName = true;
    }

    if (!email) {
      error.email = true;
    }

    if (!password) {
      error.password = true;
    }

    setFormError({
      ...formError,
      ...error,
    });

    if (Object.values(error).some((val) => val)) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `${getApiUrl()}/user`;

    const data: SignupForm = {
      firstName: signupForm.firstName,
      lastName: signupForm.lastName,
      color: signupForm.color,
      email: signupForm.email,
      password: signupForm.password,
    };

    if (!isFormValid(data)) {
      return;
    }

    const fetchConfig: RequestInit = {
      method: "post",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, fetchConfig);

      if (response.ok) {
        setSignupForm({
          firstName: "",
          lastName: "",
          color: "rgb(0,0,0)",
          email: "",
          password: "",
        });

        props.onSubmit();
        navigate("/dashboard");
      }
    } catch (e) {
      console.log("SIGN UP ERROR", e);
    }
  };

  return (
    <div>
      <Heading size="md" textAlign="center">
        Sign Up
      </Heading>
      <Box as="form" my={3} onSubmit={handleSubmit}>
        <FormControl isInvalid isRequired={formError.firstName}>
          <FormLabel htmlFor="firstName" color="orange.800">
            First Name:
          </FormLabel>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={signupForm.firstName}
            onChange={handleFormChange}
            placeholder="Enter first name"
          />
        </FormControl>

        <FormControl isInvalid isRequired={formError.lastName}>
          <FormLabel htmlFor="lastName" color="orange.800">
            Last Name:
          </FormLabel>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={signupForm.lastName}
            onChange={handleFormChange}
            placeholder="Enter last name"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="color" color="orange.800">
            Favorite Color:
          </FormLabel>
          <Input
            type="color"
            id="color"
            name="color"
            onChange={handleFormChange}
          />
        </FormControl>

        <FormControl isInvalid isRequired={formError.email}>
          <FormLabel htmlFor="email" color="orange.800">
            Email:
          </FormLabel>
          <InputGroup>
            <InputLeftElement>
              <EmailIcon color="orange.700" />
            </InputLeftElement>
            <Input
              type="email"
              id="email"
              name="email"
              value={signupForm.email}
              onChange={handleFormChange}
              placeholder="Enter email"
            />
          </InputGroup>
        </FormControl>

        <FormControl isInvalid isRequired={formError.password}>
          <FormLabel htmlFor="password" color="orange.800">
            Password:
          </FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              autoComplete="on"
              id="password"
              name="password"
              value={signupForm.password}
              onChange={handleFormChange}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem" mr={3}>
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button type="submit" mt={3}>
          Sign Up
        </Button>
      </Box>
    </div>
  );
};
