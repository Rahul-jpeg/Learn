import { Tilt } from "react-tilt";
const Login = () => {
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
                  />
                </div>
                <div className="flex items-center border-b border-dimWhite py-2">
                  <input
                    className="appearance-none bg-transparent border-none w-80 text-white mr-3 mt-12 py-1 px-2 leading-tight focus:outline-none"
                    type="password"
                    placeholder="Password"
                    id="password"
                  />
                </div>
                <div className="box-1 mt-16">
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
