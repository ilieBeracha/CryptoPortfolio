import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginRedux } from "../../app/authSlice";
import { toastAlerts } from "../../helpers/toastAlerts";
import { UserModel } from "../../models/UserModel";
import { userService } from "../../services/UserService";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login(): JSX.Element {
    const { register, handleSubmit } = useForm<UserModel>();
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    
    async function authRegister(user: UserModel) {
      try {
        const results = await userService.Login(user);
        if (results.status === 200) {
          console.log(results);
          dispatch(loginRedux(results.data));
          toastAlerts.toastSuccess("good");
          Navigate('/')

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
              <label htmlFor="">אימייל:  </label>
              <input type="text" {...register("email")} />
            </div>
            <div className="AuthFormInputsGroup">
              <label htmlFor="">סיסמא:  </label>
              <input type="password" {...register("password")} />
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
}

export default Login;
