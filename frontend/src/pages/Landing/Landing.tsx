import { Button, Stack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Signup } from "../AuthForm/Signup/Signup";
import { Login } from "../AuthForm/Login/Login";

import "./Landing.css";

export const Landing = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="landing-container">
      <Heading as="h1" size="4xl">
        Mi Mood
      </Heading>
      <Stack direction="column">
        <Button size="lg"
          onClick={() => {
            setIsSignUpOpen(true);
          }}
        >
          Sign Up
        </Button>
        {isSignUpOpen ? (
          <Modal
            open={isSignUpOpen}
            onClose={() => {
              setIsSignUpOpen(false);
            }}
          >
            <Signup
              onSubmit={() => {
                setIsSignUpOpen(false);
              }}
            />
          </Modal>
        ) : null}
        <Button size="lg"
          onClick={() => {
            setIsLoginOpen(true);
          }}
        >
          Login
        </Button>
        {isLoginOpen ? (
          <Modal
            open={isLoginOpen}
            onClose={() => {
              setIsLoginOpen(false);
            }}
          >
            <Login
              onSubmit={() => {
                setIsLoginOpen(false);
              }}
            />
          </Modal>
        ) : null}
      </Stack>
    </div>
  );
};
