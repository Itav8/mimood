import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    color: false,
    email: false,
    password: false,
  });

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

    const errors = {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
    };

    if (!firstName) {
      errors.firstName = true;
    }

    if (!lastName) {
      errors.lastName = true;
    }

    if (!email) {
      errors.email = true;
    }

    if (!password) {
      errors.password = true;
    }

    setFormErrors({
      ...formErrors,
      ...errors,
    });

    if (Object.values(errors).some((val) => val)) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `${import.meta.env.VITE_API_URL}/user`;

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
      <Heading size="md">Sign Up</Heading>
      <Box as="form" my={3} onSubmit={handleSubmit}>
        <FormControl isInvalid={formErrors.firstName}>
          <FormLabel htmlFor="firstName">First Name:</FormLabel>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={signupForm.firstName}
            onChange={handleFormChange}
          />
        </FormControl>

        <FormControl isInvalid={formErrors.lastName}>
          <FormLabel htmlFor="lastName">Last Name:</FormLabel>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={signupForm.lastName}
            onChange={handleFormChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="color">Favorite Color:</FormLabel>
          <Input
            type="color"
            id="color"
            name="color"
            onChange={handleFormChange}
          />
        </FormControl>

        <FormControl isInvalid={formErrors.email}>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            value={signupForm.email}
            onChange={handleFormChange}
          />
        </FormControl>

        <FormControl isInvalid={formErrors.password}>
          <FormLabel htmlFor="password">Password:</FormLabel>
          <Input
            type="password"
            autoComplete="on"
            id="password"
            name="password"
            value={signupForm.password}
            onChange={handleFormChange}
          />
        </FormControl>
        <Button type="submit" mt={3}>
          Sign Up
        </Button>
      </Box>
    </div>
  );
};
