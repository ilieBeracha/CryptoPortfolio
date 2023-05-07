import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginRedux } from "../../app/authSlice";
import { toastAlerts } from "../../helpers/toastAlerts";
import { UserModel } from "../../models/UserModel";
import { userService } from "../../services/UserService";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { setLoader } from "../../app/loaderSlice";
import { binanceService } from "../../services/BinanceService";

function Login(): JSX.Element {
  const { register, handleSubmit } = useForm<UserModel>();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  async function authRegister(user: UserModel) {
    try {
      const results = await userService.Login(user);
      if (results.status === 200) {
        dispatch(loginRedux(results.data));
        toastAlerts.toastSuccess("Login Successfull");
        Navigate("/");
      }
    } catch (e: any) {
      console.log(e);

      toastAlerts.toastError(e.response.data);
    }
  }

  return (
    <div className="Login">
      <div className="AuthFormSec"></div>

      <div className="AuthForm">
        <form onSubmit={handleSubmit(authRegister)}>
          <div className="AuthFormInputsGroup">
            <label htmlFor="">Email: </label>
            <input type="text" {...register("email")} />
          </div>
          <div className="AuthFormInputsGroup">
            <label htmlFor="">Password: </label>
            <input type="password" {...register("password")} />
          </div>
          <button>Submit</button>
        </form>
        <NavLink to={'/registerpage'}>Dont have an account</NavLink>
      </div>
    </div>
  );
}

export default Login;
