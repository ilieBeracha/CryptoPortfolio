import { useForm } from "react-hook-form";
import "./Register.css";
import { UserModel } from "../../models/UserModel";
import { userService } from "../../services/UserService";
import { useDispatch } from "react-redux";
import { loginRedux } from "../../app/authSlice";
import { toastAlerts } from "../../helpers/toastAlerts";
import { useEffect, useState } from "react";
import { binanceService } from "../../services/BinanceService";
import FuturePairsMultiSelect from "../../Components/FuturePairsMultiSelect/FuturePairsMultiSelect";
import { useNavigate } from "react-router-dom";

function Register(): JSX.Element {
  const { register, handleSubmit } = useForm<UserModel>();
  const dispatch = useDispatch();
  const [futuresPairs, setFuturesPairs] = useState<string[]>([]);
  const [selectedFuturesPairs, setSelectedFuturesPairs] = useState<string[]>(
    []
  );
  const Navigate = useNavigate()
  useEffect(() => {
    binanceService.getFuturesPairs().then((res) => setFuturesPairs(res));
  }, []);

  async function authRegister(user: UserModel) {
    console.log(user);
    user.tradingPairs = selectedFuturesPairs;

    try {
      const results = await userService.Register(user);
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
    <div className="Register">
      <div className="AuthFormSec"></div>

      <div className="AuthForm">
        <form onSubmit={handleSubmit(authRegister)}>
          <div className="AuthFormInputsGroup">
            <label htmlFor="">שם פרטי: </label>
            <input type="text" {...register("firstName", { required: true })} />
          </div>
          <div className="AuthFormInputsGroup">
            <label htmlFor="">שם משפחה: </label>
            <input type="text" {...register("lastName", { required: true })} />
          </div>
          <div className="AuthFormInputsGroup">
            <label htmlFor="">אימייל: </label>
            <input type="text" {...register("email", { required: true })} />
          </div>
          <div className="AuthFormInputsGroup">
            <label htmlFor="">מספר פלאפון: </label>
            <input type="number" {...register("phone", { required: true })} />
          </div>
          <div className="AuthFormInputsGroup">
            <label htmlFor="">סיסמא: </label>
            <input
              type="password"
              {...register("password", { required: true })}
            />
          </div>

          <div className="AuthFormInputsGroup">
            <label htmlFor="">מטבעות המסחר שלך: </label>
            {/* <select {...register("tradingPairs")} multiple>
              {futuresPairs?.map((pair) => (
                <option key={pair} value={pair}>
                  {pair}
                </option>
              ))}
            </select> */}

            <FuturePairsMultiSelect
              pairs={futuresPairs}
              onPairsChange={setSelectedFuturesPairs}
            />
          </div>
          <button>הרשם</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
