import { Outlet, NavLink } from "react-router-dom";
import "../styles/Layout.css";
import logoImage from "../img/logo.png";



export const Layout = () => {
    return (
      <div className="wrapper">
        <header>
        <img className="logo" src={logoImage} alt="logo" />
         <nav>
          <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/contact"}>Contact</NavLink>
            </li>
            <li>
              <NavLink to={"/booking"}>Booking</NavLink>
            </li>
            <li>
              <NavLink to={"/admin"}>Admin</NavLink>
            </li>
          </ul>
         </nav>
  
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <p>&copy; 2024 Comic Buigers. <br/> BUGGES! <br/> All rights reserved. Project crafted for educational pourposes at Medieinstitutet, all text generated with love and ChatGPT.</p>
        </footer>
      </div>
    );
  };