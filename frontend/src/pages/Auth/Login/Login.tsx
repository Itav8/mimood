import { useState } from "react";
import { useCookies } from "react-cookie";

interface LoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const [cookies] = useCookies(["jwtToken"]);
  console.log("HEHE", cookies);
  console.log("WTF", cookies.jwtToken);

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
      }
    } catch (e) {
      console.log("SIGN UP ERROR", e);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={login.email}
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
            value={login.password}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};
