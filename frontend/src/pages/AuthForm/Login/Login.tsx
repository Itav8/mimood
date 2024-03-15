import { EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../../utils/getUrl";

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
  const [formError, setFormError] = useState({
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

    setLogin({
      ...login,
      [inputName]: value,
    });
  };

  const isFormValid = (form: LoginForm) => {
    const error = {
      email: false,
      password: false,
    };

    if (!form.email) {
      error.email = true;
    }
    if (!form.password) {
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

    const url = `${getApiUrl()}/login`;

    const data: LoginForm = {
      email: login.email,
      password: login.password,
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
        setLogin({
          email: "",
          password: "",
        });

        props.onSubmit();
        navigate("/dashboard");
      }
    } catch (e) {
      console.log("LOGIN ERROR", e);
    }
  };

  return (
    <div>
      <Heading size="md" textAlign="center">
        Login
      </Heading>
      <Box as="form" my={3} onSubmit={handleSubmit}>
        <FormControl isInvalid={formError.email}>
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
              value={login.email}
              onChange={handleFormChange}
              placeholder="Enter email"
            />
          </InputGroup>
        </FormControl>

        <FormControl isInvalid={formError.password}>
          <FormLabel htmlFor="password" color="orange.800">
            Password:
          </FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              autoComplete="on"
              id="password"
              name="password"
              value={login.password}
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
          Login
        </Button>
      </Box>
    </div>
  );
};
