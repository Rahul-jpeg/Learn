// import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { courseAtom } from "../store/atoms/course";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";

const Course = () => {
  const courseState = useRecoilValue(courseAtom);
  const setCourseState = useSetRecoilState(courseAtom);
  const [purchaseStatus, setPurchaseStatus] = useState(false);
  let src, title, desc, price;
  if (courseState.course) {
    sessionStorage.setItem("id", courseState.course._id);
    src = courseState.course.imageLink;
    title = courseState.course.title;
    desc = courseState.course.description;
    price = courseState.course.price;
  }
  const id = sessionStorage.getItem("id");
  const getCourseDetails = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      if (courseState) {
        const response = await axios.get(
          `http://localhost:3001/user/course/${id}`
        );
        const course = response.data.course;
        setCourseState({
          isLoading: false,
          course: course,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const statusCheck = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      if (courseState) {
        const response = await axios.get(
          `http://localhost:3001/user/status/${id}`
        );
        const status = response.data.status;
        setPurchaseStatus(status);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCourseDetails();
    statusCheck();
  }, []);
  if (!courseState) {
    <></>;
  }

  const handlePurchase = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.post(
        `http://localhost:3001/user/purchase/${id}`
      );
      const message = response.data.Message;
      alert(message);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen w-screen bg-primary">
      <div className="w-[100%] h-[100%] flex flex-col relative items-center">
        <div className="w-[100%] h-[300px] bg-primary">
          <img src={src} alt="" className="h-[100%] w-[100%] blur-[30px]" />
          <div className="z-10 h-[100%] w-[100%] -translate-y-[300px] bg-white bg-opacity-40 blur-[30px]"></div>
        </div>
        <div className="absolute">
          <div className="h-[350px] w-[350px] bg-primary translate-y-[125px] bg-opacity-40 rounded-full flex items-center justify-center z-20">
            <img
              src={src}
              alt=""
              className="w-[330px] h-[330px]  rounded-[50%] "
            />
          </div>
        </div>
        <div className="bg-primary w-screen h-screen translate-y-44 flex flex-col justify-start items-center text-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-white font-poppins font-bold text-7xl pt-5">
              {title}
            </h1>
            <p className="text-dimWhite font-raleway text-2xl font-light">
              &#8377;{price}
            </p>
          </div>
          <p className="text-white font-raleway pt-10 px-8">{desc}</p>
          <div
            className={`h-[50px] w-[150px] bg-white bg-opacity-20  rounded-md flex flex-row items-center justify-center mt-14  ${
              purchaseStatus
                ? "cursor-not-allowed"
                : "cursor-pointer hover:bg-opacity-50"
            }`}
            onClick={handlePurchase}
          >
            <h4 className="text-white font-raleway">
              {purchaseStatus ? <CheckIcon /> : "PURCHASE"}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
