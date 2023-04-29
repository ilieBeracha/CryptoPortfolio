import { NavLink } from "react-router-dom";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import "./HomeNav.css";
import DashboardIcon from '@mui/icons-material/Dashboard';

function HomeNav(): JSX.Element {
    return (
        <div className="HomeNav">

            <div className="HomeNavLogo">
                {/* CP */}
            </div>
			<div className="HomeNavMenu">
                <NavLink to={'/'}>
                    <DashboardIcon />
                </NavLink>
            </div>


            <div className="HomeNavProfile">
                <ProfileMenu />
            </div>
        </div>
    );
}

export default HomeNav;
