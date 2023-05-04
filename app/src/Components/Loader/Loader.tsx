import "./Loader.css";
import LinearProgress from "@mui/material/LinearProgress";

function Loader(): JSX.Element {
  return (
    <div className="Loader">
      <div className="LoaderDiv">
        <p>Making the right portfolio for you!</p>
        <LinearProgress
        color="secondary"
          style={{ width: "200px", color: "#8f7cff" }}
          
        />
        <span>This may take a while...</span>
      </div>
    </div>
  );
}

export default Loader;
