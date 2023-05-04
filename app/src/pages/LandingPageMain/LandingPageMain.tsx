import Header from "../../Components/Header/Header";
import "./LandingPageMain.css";

function LandingPageMain(): JSX.Element {
  return (
    <div className="LandingPageMain">
      <Header />

      <div className="LandingPageWelcome">
        <div className="LandingPageWelcomeSentance">
          <h1>
            Join the next level of trading <br /> and take control of your{" "}
            <span>future.</span>{" "}
          </h1>
          <div>
            with our innovative platform that provides real-time tracking,
            advanced analytics, and personalized portfolio recommendations.
          </div>
          <button>Start now</button>
        </div>
      </div>
      <div className="LandingPageMainOurFeatures">
      <div className="LandingPageMainOurFeaturesTitle">
            <h3>Make your choices with us...</h3>
          </div>
        <div className="LandingPageMainOurFeaturesMainDiv">
          <div className="LandingPageMainOurFeaturesRow1">
            <div className="LandingPageMainOurFeaturesRow1F1">
            Hands-off. No ongoing costs or maintenance.
            </div>
            <div className="LandingPageMainOurFeaturesRow1F2">
            Data-driven risk/reward assessments.
            </div>
          </div>
          <div className="LandingPageMainOurFeaturesRow2">
            <div className="LandingPageMainOurFeaturesRow2F1">
            Secure and stable returns are prioritized over risky degen yields.
            </div>
            <div className="LandingPageMainOurFeaturesRow2F2">
            Low correlation to BTC, ETH, DeFi blue chips & S&P 500.
            </div>
          </div>
          {/* <div className="LandingPageMainOurFeaturesRow3">
            <h3>Make your choices with us...</h3>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default LandingPageMain;
