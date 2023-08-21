import { Box, AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LogoutIcon from "@mui/icons-material/Logout";
import "../styles/index.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginStatus } from "../store/atoms/user";
import { useEffect } from "react";

export const Navbar = () => {
  const [isLoggedIn, setisLoggedIn] = useRecoilState(loginStatus);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("id");
    setisLoggedIn(false);
    navigate("/");
  };
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setisLoggedIn(true);
    }
  });

  return (
    /* NAVBAR */
    <Box
      flexGrow={"1"}
      bgcolor={"#00040f"}
      marginTop={0}
      overflow={"hidden"}
      zIndex={"100"}
      width={"100vw"}
    >
      <AppBar
        position="static"
        sx={{
          width: "100%",
          background: "transparent",
          boxShadow: "none",
          marginTop: "0",
          paddingRight: "20px",
          zIndex: "100",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton /* LOGO AND NAME */
            className="logoIcon group"
            sx={{
              width: "220px",
              height: "80px",
              flexShrink: 0,
              borderRadius: "0",
              paddingLeft: 0,
              marginLeft: -3,
            }}
            edge="start"
            disableRipple
            onClick={() => {
              navigate("/");
            }}
          >
            <Box
              sx={{
                width: "135px",
                height: "50px",
                paddingLeft: "3rem",
                borderRadius: "5%",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <LightbulbIcon /* LOGO ICON */
                fontSize="large"
                sx={{
                  color: "white",
                }}
                className="group-hover:animate-pulse"
              />
              <Typography
                variant="h4"
                className="logoName"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "300",
                  letterSpacing: "0.5rem",
                  color: "white",
                }}
              >
                LEARN {/* NAME */}
              </Typography>
            </Box>
          </IconButton>
          {!isLoggedIn ? (
            <Box /* NAV BUTTONS */
              sx={{
                marginTop: "-12px",
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <IconButton /* LOGIN BUTTON */
                className="nav-item-wrapper"
                sx={{
                  borderRadius: 0,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "2px",
                  position: "relative",
                }}
                disableRipple
                onClick={() => {
                  navigate("/login");
                }}
              >
                <Box className="icon-wrapper">
                  <FingerprintIcon /* LOGIN BUTTON ICON */
                    fontSize="large"
                    color="success"
                    sx={{
                      position: "absolute",
                      fontSize: "45px",
                      transform: "translate(5px,-18px)",
                    }}
                  />
                </Box>
                <Box className="title">
                  <Typography
                    variant="h6"
                    sx={{
                      letterSpacing: "0.2rem",
                      fontSize: "0.7em",
                      color: "white",
                      fontFamily: "Poppins",
                      fontWeight: 200,
                    }}
                  >
                    Login {/* LOGIN LABEL */}
                  </Typography>
                </Box>
              </IconButton>
              <IconButton
                className="nav-item-wrapper"
                sx={{
                  borderRadius: 0,
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "5px",
                }}
                disableRipple
                onClick={() => {
                  navigate("/signup");
                }}
              >
                <Box className="icon-wrapper">
                  <PersonAddIcon /* SIGNUP BUTTON ICON */
                    fontSize="large"
                    color="success"
                    sx={{
                      position: "absolute",
                      fontSize: "35px",
                      transform: "translate(18px, -15px)",
                    }}
                  />
                </Box>
                <Box className="title">
                  <Typography
                    variant="h6"
                    sx={{
                      letterSpacing: "0.2rem",
                      fontSize: "0.7em",
                      color: "white",
                      fontFamily: "Poppins",
                      fontWeight: 200,
                    }}
                  >
                    Signup {/* SIGNUP LABEL */}
                  </Typography>
                </Box>
              </IconButton>
            </Box>
          ) : (
            <Box
              sx={{
                marginTop: "-12px",
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                marginRight: "20px",
              }}
            >
              <IconButton /* LOGOUT BUTTON */
                className="nav-item-wrapper"
                sx={{
                  borderRadius: 0,
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "2px",
                }}
                onClick={() => handleLogout()}
                disableRipple
              >
                <Box className="icon-wrapper">
                  <LogoutIcon /* LOGOUT BUTTON ICON */
                    color="error"
                    fontSize="large"
                    sx={{
                      position: "absolute",
                      transform: "translate(20px, -15px)",
                    }}
                  />
                </Box>
                <Box className="title">
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "200",
                      fontSize: "0.7em",
                      color: "white",
                      fontFamily: "Poppins",
                      letterSpacing: "0.2rem",
                    }}
                  >
                    Logout {/* LOGOUT LABEL */}
                  </Typography>
                </Box>
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
