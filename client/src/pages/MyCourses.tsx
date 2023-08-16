import Sidebar from "../components/Sidebar";

const MyCourses = () => {
  return (
    <div className="h-screen w-screen bg-primary flex">
      <Sidebar />
      <div className="text-white flex-1">mycourses</div>
    </div>
  );
};

export default MyCourses;
