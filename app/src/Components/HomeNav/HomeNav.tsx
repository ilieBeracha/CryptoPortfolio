import { NavLink } from "react-router-dom";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import "./HomeNav.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";

function HomeNav(): JSX.Element {
  return (
    <div className="HomeNav">
      <div className="HomeNavLogo">{/* CP */}</div>
      <div className="HomeNavMenu">
        <NavLink to={"/"}>
          <DashboardIcon />
        </NavLink>

        <NavLink to={"/settings"}>
            <SettingsIcon />
        </NavLink>
      </div>

      <div className="HomeNavProfile">
        <ProfileMenu />
      </div>
    </div>
  );
}

export default HomeNav;
