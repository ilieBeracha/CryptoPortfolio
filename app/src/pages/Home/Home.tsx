import { Route, Routes } from "react-router-dom";
import HomeNav from "../../Components/HomeNav/HomeNav";
import "./Home.css";
import Dashboard from "../Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../../Components/Loader/Loader";

function Home(): JSX.Element {
  const loaderSlice = useSelector((state: any) => state.loader);

  useEffect(()=>{
    console.log(loaderSlice);
  },[loaderSlice]);

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
          </Routes>
        </>
      )}
    </div>
  );
}

export default Home;
