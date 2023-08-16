import "./styles/index.css";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.tsx";
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";
import AllCourses from "./pages/AllCourses.tsx";
import MyCourses from "./pages/MyCourses.tsx";
import Purchase from "./pages/Purchase.tsx";
// import Error from "./pages/Error.tsx";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" Component={Landing} />
          <Route path="/signup" Component={Signup} />
          <Route path="/login" Component={Login} />
          <Route path="/courses" Component={AllCourses} />
          <Route path="/mycourses" Component={MyCourses} />
          <Route path="/purchase" Component={Purchase} />
          {/* <Route path="/error" Component={Error} /> */}
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
