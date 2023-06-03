import * as React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import MenuDrawer from "../LayOut/MenuDrawer";

function ResponsiveAppBar() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const user = localStorage.getItem("x-user-data");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  console.log("--user-->", user);

  return (
    <div className="row profile-dtl">
      <div className="col-2">
        <div className="img-hldr">
          {user?.image ? (
            <img
              src={user?.image && user?.image}
              alt=""
              height={50}
              width={50}
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <AccountCircleIcon style={{ color: "white", fontSize: "2.6rem" }} />
          )}
        </div>
      </div>
      <div className="col-8">
        <div className="desc-hldr">
          <h2>
            <strong>{user?.name}</strong>
          </h2>
          <p>{user?.designation}</p>
        </div>
      </div>
      <div className="col-2">
        <MenuDrawer style={{ fontSize: "1.6rem", color: "white" }} />
        {/* <LogoutIcon
        style={{ fontSize: "1.6rem", color: "white" }}
        onClick={() => window.location.replace("#/admin/login")}
      /> */}
        {/* <img src="../images/icon_more.svg" alt="More" /> */}
      </div>
    </div>
  );
}
export default ResponsiveAppBar;
