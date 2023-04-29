import Header from "../../Components/Header/Header";
import "./LandingPageMain.css";

function LandingPageMain(): JSX.Element {
    return (
        <div className="LandingPageMain">
			<Header />

            <div className="LandingPageWelcome"></div>
            <div className="LandingPageMainDiv2"></div>
        </div>
    );
}

export default LandingPageMain;
