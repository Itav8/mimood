import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProp {
  onSubmit: () => void;
}

interface LoginForm {
  email: string;
  password: string;
}

export const Login = (props: LoginProp) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<LoginForm>({
    email: "",
    password: "",
  });


  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setLogin({
      ...login,
      [inputName]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `${import.meta.env.VITE_API_URL}/signin`;

    const data: LoginForm = {
      email: login.email,
      password: login.password,
    };

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
        setLogin({
          email: "",
          password: "",
        });

        props.onSubmit;
        navigate("/dashboard");
      }
    } catch (e) {
      console.log("LOGIN ERROR", e);
    }
  };

  return (
    <div>
      <Heading size="md">Login</Heading>
      <Box as="form" my={3} onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            value={login.email}
            onChange={handleFormChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Password:</FormLabel>
          <Input
            type="password"
            autoComplete="on"
            id="password"
            name="password"
            value={login.password}
            onChange={handleFormChange}
          />
        </FormControl>
        <Button type="submit" mt={3}>
          Login
        </Button>
      </Box>
    </div>
  );
};
