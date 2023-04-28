import ProfileMenu from "../ProfileMenu/ProfileMenu";
import "./HomeNav.css";

function HomeNav(): JSX.Element {
    return (
        <div className="HomeNav">
			<div className="HomeNavMenu">

            </div>


            <div className="HomeNavProfile">
                <ProfileMenu />
            </div>
        </div>
    );
}

export default HomeNav;
