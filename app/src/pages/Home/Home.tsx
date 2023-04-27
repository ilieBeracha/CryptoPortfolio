import { Route, Routes } from "react-router-dom";
import HomeNav from "../../Components/HomeNav/HomeNav";
import "./Home.css";
import Dashboard from "../Dashboard/Dashboard";

function Home(): JSX.Element {
  return (
    <div className="Home">
      <HomeNav />
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default Home;
