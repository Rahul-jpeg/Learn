import { Tilt } from "react-tilt";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { userUsername } from "../store/selectors/user";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { loginStatus, userState } from "../store/atoms/user";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import { errorState } from "../store/atoms/axios";

const Login = () => {
  const [password, setPassword] = useState("");
  const username = useRecoilValue(userUsername);
  const setUsername = useSetRecoilState(userState);
  const navigate = useNavigate();
  const [err, setErr] = useRecoilState(errorState);
  const setLoginStatus = useSetRecoilState(loginStatus);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername({
      isLoading: false,
      userUsername: e.target.value,
    });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/user/login", {
        username,
        password,
      });
      const token = response.data.token;
      sessionStorage.setItem("authToken", token);
      setLoginStatus(true);
      navigate("/courses");
    } catch (e) {
      setErr(true);
    }
  };

  if (err) {
    return <Error />;
  }
  return (
    <div className="bg-primary h-[100%] w-[100%] overflow-hidden fixed ">
      <div className="flex flex-col justify-center items-center pt-20">
        <div className="w-screen h-screen blue__gradient absolute top-10 overflow-hidden translate-y-40"></div>
        <div className=" w-72 h-72 white__gradient overflow-hidden absolute"></div>
        <Tilt>
          <div className="h-[510px] w-[510px] bg-white bg-opacity-5 rounded-md  backdrop-filter backdrop-filter-sm hover:shadow-glow hover:ease-in-out">
            <div className="flex flex-col items-center py-7 gap-10">
              <h1 className="text-dimWhite font-poppins font-normal tracking-widest hover:glow">
                LOGIN
              </h1>
              <div className="flex flex-col justify-evenly items-center">
                <div className="flex items-center border-b border-white py-2">
                  <input
                    className="appearance-none bg-transparent border-none w-80 text-white mr-3 mt-12 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Username"
                    id="username"
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="flex items-center border-b border-dimWhite py-2">
                  <input
                    className="appearance-none bg-transparent border-none w-80 text-white mr-3 mt-12 py-1 px-2 leading-tight focus:outline-none"
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="box-1 mt-16" onClick={handleSubmit}>
                  <div className="btn btn-one">
                    <a className="no-underline text-white">Submit</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tilt>
      </div>
    </div>
  );
};

export default Login;
