import "../styles/index.css";
import onlineLearning from "../assets/onlineLearning.png";
import { useRecoilState } from "recoil";
import { loginStatus } from "../store/atoms/user";

const Landing = () => {
  const isLoggedIn = useRecoilState(loginStatus);

  return (
    <div className="h-screen w-screen bg-primary">
      <div className="bg-primary flex justify-center items-start ">
        <div className="xl:max-w-[1280px] w-full">
          <section className="flex md:flex-row flex-col py-6 ml-28">
            <div className="flex-1 flex justify-center items-start flex-col px-6">
              <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold text-[75px] text-white leading-[100px]">
                  Your <br className="sm:block hidden" />{" "}
                  <span className="text-gradient font-light text-[100px]">
                    LEARNING
                  </span>
                </h1>
              </div>
              <h1 className="font-poppins font-semibold text-[75px] text-white leading-[90px]">
                Never Stops.
              </h1>
              <p className="font-poppins font-normal text-dimWhite text-[18px] leading-[30px] max-w-[470px] mt-5">
                Discover your passion, develop new skills, and achieve your
                goals with our wide range of courses. Empower yourself through
                learning, at your own pace, and elevate your future.
              </p>
            </div>

            <div className="flex-1 flex justify-center items-center my-10 relative ">
              <img
                src={onlineLearning}
                alt="online-learning"
                className="w-[500px] h-[500px] z-[5]"
              />
              <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
              <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient" />
              <div className="absolute z-[0] w-[50%] h-[50%] right-40 bottom-10 blue__gradient" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Landing;
