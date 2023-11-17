import { useState } from "react";
import { Modal } from "../../components/Modal";
import { Signup } from "../Auth/Signup/Signup";
import { Login } from "../Auth/Login/Login";
import { useCookies } from "react-cookie";
import "./Landing.css";

export const Landing = () => {
  // const [cookies] = useCookies(["jwtToken"]);
  // console.log("HEHE", cookies);
  // console.log("WTF", cookies.jwtToken);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="landing-container">
      <h1 className="landing-container_title">Mi Mood</h1>
      <div className="button-container">
        <button
          onClick={() => {
            setIsSignUpOpen(true);
          }}
        >
          Sign Up
        </button>
        {isSignUpOpen ? (
          <Modal
            open={isSignUpOpen}
            onClose={() => {
              setIsSignUpOpen(false);
            }}
          >
            <Signup />
          </Modal>
        ) : null}
        <button
          onClick={() => {
            setIsLoginOpen(true);
          }}
        >
          Login
        </button>
        {isLoginOpen ? (
          <Modal
            open={isLoginOpen}
            onClose={() => {
              setIsLoginOpen(false);
            }}
          >
            <Login
            onSubmit={() => {
              setIsLoginOpen(false)
            }}
            />
          </Modal>
        ) : null}
      </div>
    </div>
  );
};
