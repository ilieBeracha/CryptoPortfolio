import { Route, Routes } from "react-router-dom";
import Register from "../Register/Register";
import LandingPageMain from "../LandingPageMain/LandingPageMain";
import "./LandingPage.css";
import Login from "../Login/Login";

function LandingPage(): JSX.Element {
  return (
    <div className="LandingPage">
      <Routes>
        <Route path="/" element={<LandingPageMain />}></Route>
        <Route path="/registerpage" element={<Register />}></Route>
        <Route path="/loginpage" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default LandingPage;
