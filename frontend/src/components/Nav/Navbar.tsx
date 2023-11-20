import { NavLink } from "react-router-dom";
import { authRoutes } from "../../routes/routes";

export const NavBar = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      {authRoutes.map((route) => {
        return (
          <NavLink className="navbar__link" key={route.path} to={route.path}>
            {route.name}
          </NavLink>
        );
      })}
    </div>
  );
};
