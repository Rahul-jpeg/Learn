import { ReactNode, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Course, courseAtom } from "../store/atoms/course.ts";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const [courses, setCourses] = useState<Course>([]);
  const setCourseAtom = useSetRecoilState(courseAtom);
  const navigate = useNavigate();
  const getMyCourses = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get("http://localhost:3001/user/mycourses");
      setCourses(response.data.Courses);
      console.log(response.data.Courses);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCourseSelection = (data: Course) => {
    setCourseAtom({
      isLoading: false,
      course: data,
    });
    navigate(`/course/${data._id}`);
  };

  useEffect(() => {
    getMyCourses();
  }, []);
  return (
    <div className="h-screen w-screen bg-primary flex">
      <Sidebar />
      <div className="text-white flex-1 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {courses.map((data: Course): ReactNode | null => {
          return (
            <div
              className="h-[300px] w-[300px] bg-blue-200 bg-opacity-20 rounded-md ml-8 mt-8 hover:shadow-glow cursor-pointer hover:-translate-y-2"
              key={data._id}
              onClick={() => handleCourseSelection(data)}
            >
              <div className="flex flex-col justify-center items-center gap-2">
                <img
                  src={data.imageLink}
                  alt={data.title}
                  className="rounded-t-md w-[100%] h-48"
                />
                <div className="flex flex-col justify-between items-center gap-2 font-poppins font-medium">
                  <div className="text-2xl">{data.title}</div>
                  <div className="font-normal font-raleway">
                    &#8377; {data.price}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCourses;
