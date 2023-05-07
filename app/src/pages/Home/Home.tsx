import { Route, Routes } from "react-router-dom";
import HomeNav from "../../Components/HomeNav/HomeNav";
import "./Home.css";
import Dashboard from "../Dashboard/Dashboard";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";

function Home(): JSX.Element {
  const loaderSlice = useSelector((state: any) => state.loader);


  return (
    <div className="Home">
      {loaderSlice ? (
        <div className="LoaderDiv">
          <Loader />
        </div>
      ) : (
        <>
          <HomeNav />
          <Routes>
            <Route path="*" element={<Dashboard />}></Route>
            <Route path="/settings" element={"settings"}></Route>
          </Routes>
        </>
      )}
    </div>
  );
}

export default Home;
