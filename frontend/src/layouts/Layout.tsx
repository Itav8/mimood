import { Outlet } from "react-router-dom"
import { NavBar } from "../components/Nav/Navbar"

export const Layout = () => {
  return (
    <>
    <NavBar />
    <div>
      <Outlet />
    </div>
    </>
  )
}
