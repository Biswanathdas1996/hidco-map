import * as React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { get, post } from "../helper/apiHelper";
import swal from "sweetalert";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AutocompliteInput from "../components/AutocompliteInput";
import "../css/registration.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  // empID: Yup.string().required("EmpID is required"),
  // email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(/^\d{6}$/, "Enter only 6 digits number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Pin must match")
    .required("Confirm Pin is required"),
});

const initialValues = {
  // empID: "",
  faceID: "",
  name: "",
  // email: "",
  password: null,
  confirmPassword: "",
  contactNumber: "",
  designationId: "",
};

export default function UserRegister({ faceData }) {
  const [image, setImage] = React.useState(null);
  const [selectedPoliceStation, setSelectedPoliceStation] =
    React.useState(null);
  const [designation, setDesignation] = React.useState(null);
  const [policeStations, setPoliceStations] = React.useState(null);
  function handleImageUpload(event) {
    const file = event.target.files[0];

    const fileSize = file.size / 1024; // Convert to kilobytes
    const maxSize = 2024; // Set the maximum size to 1 MB

    if (fileSize > maxSize) {
      swal(
        "Large File!",
        "File size exceeds the maximum limit of 1MB",
        "error"
      );
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = function () {
      const base64String = reader.result;
      setImage(base64String);
      // Do something with the base64String, such as send it to the server
    };
  }

  const getPoliceStations = async () => {
    const response = await get("/policeStation");
    if (response?.success) {
      console.log("---response-->", response);
      setPoliceStations(response?.data);
    }
  };

  React.useEffect(() => {
    getPoliceStations();
  }, []);

  const getDesignation = async () => {
    const response = await get("/designation");
    if (response?.success) {
      console.log("---getDesignation-->", response?.data);
      setDesignation(response?.data);
    }
  };

  React.useEffect(() => {
    getDesignation();
  }, []);

  const selectedPoliceStationCallback = (data) => {
    console.log("---->", data);
    setSelectedPoliceStation(data?.id);
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="container main">
        <div className="bg-default" style={{ zIndex: 0 }}></div>
        <div className="container" style={{ zIndex: 1 }}>
          <div className="welcome">
            <h6 style={{ color: "white" }}>Welcome To</h6>
          </div>
          <div className="Security">
            <h3 style={{ color: "white" }}>Security Surveillance System</h3>
          </div>
          <div className="Register">
            <h1>Register Your Details</h1>
          </div>
        </div>
        <div className="container bg-white">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              if (!image) {
                swal(
                  "Image is missing",
                  "Please upload your picture",
                  "warning"
                );
                return;
              }

              const body = {
                ...values,
                password: values?.password,
                faceID: JSON.stringify(faceData),
                profileImage: image,
                policeStationId: selectedPoliceStation,
              };

              if (!selectedPoliceStation) {
                swal("Error", "Please select proper police station", "warning");
                return;
              }
              if (body?.designationId === "") {
                swal("Error", "Please select proper designation", "warning");
                return;
              }
              delete body.confirmPassword;

              const response = await post("/auth/register", body);
              if (response?.success) {
                window.location = "#/login";
              } else {
                swal("Sorry!", "Some error occured!", "error");
              }
              setSubmitting(false);
            }}
            style={{ marginTop: 20 }}
          >
            {(formik) => (
              <Form>
                {policeStations && (
                  <div className="mb-3">
                    <label>Police Station</label>
                    <FormControl size="small" fullWidth>
                      {/* <InputLabel
                        size="small"
                        id="demo-simple-select-label"
                        style={{
                          marginLeft: "1.5rem",
                          marginTop: 7,
                        }}
                      ></InputLabel> */}
                      <AutocompliteInput
                        data={policeStations}
                        onchangeCallback={selectedPoliceStationCallback}
                      />
                    </FormControl>

                    <ErrorMessage name="policeStation" />
                  </div>
                )}
                {designation && (
                  <div className="mb-3">
                    <label>
                      {" "}
                      {window.site_text("pages.register.designation")}
                    </label>
                    <FormControl size="small" fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="designationId"
                        className="form-control icon-input input-eid"
                        value={formik.values.designationId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.designationId &&
                          formik.errors.designationId
                        }
                        helperText={
                          formik.touched.designationId &&
                          formik.errors.designationId
                        }
                      >
                        {designation?.map((data, index) => (
                          <MenuItem value={data?.id} key={index}>
                            {data?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <ErrorMessage name="designationId" />
                  </div>
                )}
                {/* <div className="mb-3">
                  <input
                    type="text"
                    className="form-control icon-input input-eid"
                    id="exampleInputEmpId"
                    placeholder={window.site_text("pages.register.emp_ID")}
                    name="empID"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.empID}
                    error={formik.touched.empID && formik.errors.empID}
                    helperText={formik.touched.empID && formik.errors.empID}
                  />
                  <ErrorMessage name="empID" />
                </div> */}

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control icon-input input-uid"
                    id="exampleInputName1"
                    placeholder={window.site_text("pages.register.name")}
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    error={formik.touched.name && formik.errors.name}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                  <ErrorMessage name="name" />
                </div>
                {/* <div className="mb-3">
                  <input
                    type="email"
                    className="form-control icon-input input-ctno"
                    id="InputEmail1"
                    aria-describedby="emailHelp"
                    placeholder={window.site_text("pages.register.email")}
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                    style={{ marginTop: 20 }}
                  />
                  <ErrorMessage name="email" />
                </div> */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control icon-input input-email"
                    id="exampleInputcontactNumber"
                    placeholder={window.site_text("pages.register.contact")}
                    name="contactNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contactNumber}
                    error={
                      formik.touched.contactNumber &&
                      formik.errors.contactNumber
                    }
                    helperText={
                      formik.touched.contactNumber &&
                      formik.errors.contactNumber
                    }
                  />
                  <ErrorMessage name="contactNumber" />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control icon-input input-password"
                    id="exampleInputPassword1"
                    placeholder={window.site_text("pages.register.password")}
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    error={formik.touched.password && formik.errors.password}
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                  <ErrorMessage name="password" />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control icon-input input-password"
                    id="exampleInputPassword2"
                    placeholder={window.site_text(
                      "pages.register.confirm_passowrd"
                    )}
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    error={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                  <ErrorMessage name="confirmPassword" />
                </div>
                {image && (
                  <center>
                    <img
                      src={image}
                      alt="user"
                      height={100}
                      width={100}
                      style={{
                        margin: 10,
                        border: "5px solid gray",
                        borderRadius: "50%",
                      }}
                    />
                  </center>
                )}
                <div className="textinput">
                  <p>Take Your Picture</p>
                  {/* <input */}
                  <input
                    type="file"
                    id="image-upload"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="image-upload">
                    <div className="camera-icon">
                      <AddAPhotoIcon style={{ fontSize: "3rem" }} />
                      {/* <img src="../images/camera.png" alt="camera" /> */}
                    </div>
                  </label>
                </div>

                <center>
                  {!formik?.isSubmitting ? (
                    <div className="button" type="submit" style={{ margin: 0 }}>
                      <button type="submit" className="btn">
                        {window.site_text("pages.register.button")}
                      </button>
                    </div>
                  ) : (
                    <div className="loader"></div>
                  )}
                </center>
              </Form>
            )}
          </Formik>
        </div>
        <div
          className="register mt-4"
          onClick={() => (window.location.href = "#/login")}
        >
          <p>Already registered? </p>
          <p>
            <strong>CLICK HERE</strong> to sign in
          </p>
        </div>
      </div>
    </div>
  );
}
