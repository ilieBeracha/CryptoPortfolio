import Header from "../../Components/Header/Header";
import "./LandingPageMain.css";
import wallet from "../../assets/images/Wallet-bro.png";
import { useNavigate } from "react-router-dom";

function LandingPageMain(): JSX.Element {
    const Navigate = useNavigate();
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
          <button onClick={()=> Navigate('/registerpage')}>Start now</button>
        </div>

        <div className="LandingPageWelcomeImage">
            <img src={wallet} alt="" />
        </div>
      </div>
      <div className="LandingPageMainOurFeatures">
        <div className="LandingPageMainOurFeaturesTitle">
          <h3>Make your choices with us...</h3>
        </div>

        <div className="LandingPageMainOurFeaturesDiv">
          <div className="LandingPageMainOurFeature">
            <div className="LandingPageMainOurFeatureHeader">
              <h3>Real-time tracking</h3>
            </div>

            <div className="LandingPageMainOurFeatureContent">
              <p>
                Stay up-to-date with the latest market trends and track your
                portfolio in real-time with our innovative platform.
              </p>
            </div>
          </div>
          <div className="LandingPageMainOurFeature">
            <div className="LandingPageMainOurFeatureHeader">
              <h3>Advanced analytics</h3>
            </div>
            <div className="LandingPageMainOurFeatureContent">
              <p>
                Get a deeper understanding of your investments with our advanced
                analytics tools that provide you with key insights and
                data-driven risk/reward assessments.
              </p>
            </div>
          </div>
          <div className="LandingPageMainOurFeature">
            <div className="LandingPageMainOurFeatureHeader">
              <h3>portfolio recommendations</h3>
            </div>
            <div className="LandingPageMainOurFeatureContent">
              <p>
                Receive personalized portfolio recommendations based on your
                risk profile and investment goals, and make informed decisions
                about your investments.
              </p>
            </div>
          </div>
          <div className="LandingPageMainOurFeature">
            <div className="LandingPageMainOurFeatureHeader">
              <h3>Hands-off trading</h3>
            </div>
            <div className="LandingPageMainOurFeatureContent">
              <p>
                Sit back and relax while our platform takes care of your
                investments for you. With our hands-off approach to trading, you
                can trust that your investments are in good hands.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPageMain;

{
  /* <div className="LandingPageMainOurFeaturesTitle">
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
         
        </div> */
}
