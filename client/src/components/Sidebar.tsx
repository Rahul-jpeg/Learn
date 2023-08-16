import FolderSpecialOutlinedIcon from "@mui/icons-material/FolderSpecialOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-screen w-[100px] blue__gradient absolute"></div>
      <div className="bg-transparent h-screen w-[100px] flex flex-col justify-start gap-32 items-center px-3 py-20 z-10">
        <div className="flex flex-col items-center gap-5">
          <div
            className="flex flex-col items-center justify-center group cursor-pointer"
            onClick={() => {
              navigate("/purchase");
            }}
          >
            <IconButton disableRipple>
              <SearchOutlinedIcon className="text-dimWhite" />
            </IconButton>
            <div className="text-dimWhite text-center font-light text-sm w-14 h-6 rounded-md absolute translate-x-12 bg-gray-800 opacity-0 group-hover:opacity-100 cursor-default">
              Search
            </div>
          </div>
          <div
            className="flex flex-col items-center group cursor-pointer"
            onClick={() => {
              navigate("/mycourses");
            }}
          >
            <IconButton disableRipple>
              <FolderSpecialOutlinedIcon className="text-dimWhite" />
            </IconButton>
            <div className="text-dimWhite text-center font-light text-sm w-14 h-6 rounded-md absolute translate-x-12 translate-y-2 bg-gray-800 opacity-0 group-hover:opacity-100 cursor-default">
              Owned
            </div>
          </div>
          <div
            className="flex flex-col items-center justify-center group cursor-pointer"
            onClick={() => {
              navigate("/courses");
            }}
          >
            <IconButton disableRipple>
              <MenuBookIcon className="text-dimWhite" />
            </IconButton>
            <div className="text-dimWhite text-center font-light text-sm w-14 h-6 rounded-md absolute translate-x-12 bg-gray-800 opacity-0 group-hover:opacity-100 cursor-default">
              Browse
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
