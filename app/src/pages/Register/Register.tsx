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
import { setLoader } from "../../app/loaderSlice";

function Register(): JSX.Element {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [secretKey, setSecretKey] = useState<string>("");
  const [steps, setSteps] = useState<number>(1);
  const dispatch = useDispatch();
  const [futuresPairs, setFuturesPairs] = useState<string[]>([]);
  const [selectedFuturesPairs, setSelectedFuturesPairs] = useState<string[]>(
    []
  );
  const Navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<any>();

  useEffect(() => {
    binanceService.getFuturesPairs().then((res) => setFuturesPairs(res));
  }, []);

  async function Step2(conf: any) {
    setApiKey(conf.apikey);
    setSecretKey(conf.secretkey);

    const data: any = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password,
      apiKey: apiKey,
      secretKey: secretKey,
      tradingPairs: selectedFuturesPairs,
    };

    await authRegister(data);
  }

  async function authRegister(user: UserModel) {
    console.log(user);
    try {
      const results = await userService.Register(user);
      if (results.status === 200) {
        dispatch(loginRedux(results.data));
        dispatch(setLoader(true))
        binanceService.getFutureTradesHistory().then((res) => {
          dispatch(setLoader(false))
          if (res.status === 200) {
            toastAlerts.toastSuccess("good");
            Navigate("/");
          } else {
            toastAlerts.toastError(res.data);
          }
        });
      }
    } catch (e: any) {
      console.log(e);

      toastAlerts.toastError(e.response.data);
    }
  }

  async function Step1(personalData: any) {
    setFirstName(personalData.firstName);
    setLastName(personalData.lastName);
    setEmail(personalData.email);
    setPassword(personalData.password);
    setPhone(personalData.phone);
    setSteps(2);
    reset();
  }

  return (
    <div className="Register">
     
          <div className="AuthFormSec"></div>
          <div className="AuthForm">
            {steps === 1 ? (
              <form onSubmit={handleSubmit(Step1)}>
                <div className="AuthFormInputsGroup">
                  <label htmlFor="">שם פרטי: </label>
                  <input
                    type="text"
                    {...register("firstName", { required: true })}
                  />
                </div>
                <div className="AuthFormInputsGroup">
                  <label htmlFor="">שם משפחה: </label>
                  <input
                    type="text"
                    {...register("lastName", { required: true })}
                  />
                </div>
                <div className="AuthFormInputsGroup">
                  <label htmlFor="">אימייל: </label>
                  <input
                    type="text"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="AuthFormInputsGroup">
                  <label htmlFor="">מספר פלאפון: </label>
                  <input
                    type="phone"
                    {...register("phone", { required: true })}
                  />
                </div>
                <div className="AuthFormInputsGroup">
                  <label htmlFor="">סיסמא: </label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                  />
                </div>
                {/* <div className="AuthFormInputsGroup">
            <label htmlFor="">מטבעות המסחר שלך: </label>
            
            
            <FuturePairsMultiSelect
            pairs={futuresPairs}
            onPairsChange={setSelectedFuturesPairs}
            />
          </div> */}
                <button>המשך</button>
              </form>
            ) : (
              <form onSubmit={handleSubmit(Step2)}>
                <div className="AuthFormInputsGroup">
                  <label>מפתח (api key)</label>
                  <input
                    type="text"
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>
                <div className="AuthFormInputsGroup">
                  <label>מפתח סודי (Access key)</label>
                  <input
                    type="text"
                    onChange={(e) => setSecretKey(e.target.value)}
                  />
                </div>
                <div className="AuthFormInputsGroup">
                  <label htmlFor="">מטבעות המסחר שלך: </label>

                  <FuturePairsMultiSelect
                    pairs={futuresPairs}
                    onPairsChange={setSelectedFuturesPairs}
                  />
                </div>
                <button type="submit" className="">
                  התחל
                </button>
              </form>
            )}
          </div>
    </div>
  );
}

export default Register;
