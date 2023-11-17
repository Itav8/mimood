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
    color: "",
    email: "",
    password: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setSignupForm({
      ...signupForm,
      [inputName]: value,
    });
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
          color: "",
          email: "",
          password: "",
        });

        props.onSubmit;
        navigate("/dashboard");
      }
    } catch (e) {
      console.log("SIGN UP ERROR", e);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={signupForm.firstName}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={signupForm.lastName}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="color">Favorite Color:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={signupForm.color}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={signupForm.email}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            autoComplete="on"
            id="password"
            name="password"
            value={signupForm.password}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </form>
    </div>
  );
};
