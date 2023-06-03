import * as React from "react";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { styled,createStyles } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

const styles= createStyles({
  formControlLabel: { fontSize: '10px', color: '#BAB9B9',
  '& label': { fontSize: '10px', color: '#BAB9B9' } }
});

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  // width: 45,
  // height: 30,
  // padding: 7,
  '&.MuiSwitch-root' : {
    marginRight: 0
  },
  '& .MuiSwitch-switchBase': {
     margin: 0,
    // padding: 0,
    color:'#fff',
    '&.Mui-checked': {
      '& + .MuiSwitch-track': {
        opacity: 0.5,
        backgroundColor: '#AD0004',
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: '#AD0004',
        // marginTop: 4,
        // width: 20,
        // height: 20,
      }
    },
  },
  // '& .MuiSwitch-thumb': {
  //   backgroundColor: '#AD0004',
  //   marginTop: 4,
  //   width: 20,
  //   height: 20,
  // },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#BAB9B9',
  },
}));


const ListOfUserView = ({ users, approveUser, updateUserStatus, updateUserLockedStatus }) => {
  console.log("---->users", users);
  return (
    <>
      {users ? (
        <div className="container">
          {users?.map((user, index) => (
            <div
              className="list-hldr n-route mt-3"
              style={{ justifyContent: "space-between" }}
              key={index + user?.id}
            >
              <div className="desc-hldr">
                <div>
                  <div className="img-hldr">
                    <img src="../images/icon-profile-circled.svg" alt="" />
                    {/* <img
                      alt="Remy Sharp"
                      src={user?.profileImage}
                      style={{ width: 33, height: 33, borderRadius: "50%" }}
                    /> */}
                  </div>
                  <div className="text-hldr">
                    <p>
                      <strong style={{ color: "#ad0004" }}>{user?.name}</strong>
                    </p>

                    <p>
                      {" "}
                      {user?.roles[0]?.name === "Admin"
                        ? "Administrator"
                        : user?.designation?.name}
                    </p>
                  </div>
                </div>

                {user?.policeStation && (
                  <div>
                    <div className="img-hldr">
                      <img src="../images/icon-bookmark-circled.svg" alt="" />
                    </div>
                    <div className="text-hldr">
                      <p>
                        <strong style={{ color: "#ad0004" }}>
                          Police Station
                        </strong>
                      </p>
                      <p>{user?.policeStation?.name}</p>
                    </div>
                  </div>
                )}
                <div>
                  <div className="img-hldr">
                    {/* <img src="../images/icon-profile-circled.svg" alt="" /> */}
                    <LocalPhoneOutlinedIcon sx={{color: "#AD0004"}} />
                  </div>
                  <div className="text-hldr">
                    <p>
                      <strong style={{ color: "#ad0004" }}>
                        Contact Number
                      </strong>
                    </p>
                    <p>{user?.contactNumber}</p>
                  </div>
                </div>
              </div>
              <div className={`lst-btn-hldr ${user?.isApproved ? 'status-lock-icon' : ''}`}>
                {!user?.isApproved ? (
                  <button
                    type="button"
                    onClick={() => approveUser(user?.id)}
                    style={{ background: "#039f2f", color: "white" }}
                  >
                    {/* <img src="../images/icon-add.png" alt="" /> */}
                    <HowToRegIcon />
                  </button>
                ) : (
                  <>
                  {/* <Switch checked = {user?.status} 
                  onChange={()=>updateUserStatus(user?.id)} /> */}
                      <FormGroup>
                        <FormControlLabel
                          control={<MaterialUISwitch sx={{ m: 1 }} checked = {user?.status} 
                          onChange={()=>updateUserStatus(user?.id)}  />}
                          label={<Typography style={styles.formControlLabel}>
                            {user?.status ? 'Active' : 'Inactive'}</Typography>
                            }
                        />
                      </FormGroup>
                  {user?.isLocked && <button
                    type="button"
                    onClick={() => updateUserLockedStatus(user?.id)}
                  >
                    {/* {user?.status ? "Deactive" : "Activate"} */}
                    <img
                      src={
                        user?.isLocked
                          ? "../images/lock.png"
                          : "../images/unlock.png"
                      }
                      alt=""
                      height="28"
                    />
                  </button>}</>
                )}
              </div>
            </div>
          ))}
          <br />
          {users?.length === 0 && (
            <b style={{ textAlign: "center" }}>No user found</b>
          )}
        </div>
      ) : (
        <center>
          <div className="loader" style={{ margin: "5rem" }}></div>
        </center>
      )}
    </>
  );
};

export default ListOfUserView;
