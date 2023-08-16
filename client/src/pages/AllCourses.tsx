import { ReactNode, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import data from "../data.ts";
import axios from "axios";

const AllCourses = () => {
  useEffect(() => {
    axios;
  });
  return (
    <div className="h-screen w-screen bg-primary flex">
      <Sidebar />
      <div className="text-white flex-1 grid lg:grid-cols-4 ss:grid-cols-2">
        {data.map((data, index): ReactNode | null => {
          return (
            <div
              className="h-[250px] w-[250px] bg-blue-200 bg-opacity-20 rounded-md ml-8 mt-8 hover:shadow-glow cursor-pointer hover:-translate-y-2"
              key={index}
            >
              <div className="flex flex-col justify-center items-center gap-2">
                <img
                  src={data.imageLink}
                  alt={data.title}
                  className="rounded-t-md w-[100%] h-40"
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

export default AllCourses;

{
  /* <div className="h-[250px] w-[250px] bg-gray-600 bg-opacity-25 rounded-md ml-8 mt-8">
  <div className="flex flex-col justify-center items-center gap-2">
    <img
      src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww&w=1000&q=80"
      alt="banana"
      className="rounded-t-md w-[100%] h-40"
    />
    <div className="flex flex-col justify-between items-center gap-2 font-poppins font-medium">
      <div className="text-2xl">Banana Course</div>
      <div className="font-normal font-raleway">&#8377; 499</div>
    </div>
  </div>
</div> */
}
