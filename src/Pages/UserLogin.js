import React from "react";
import TextField from "@mui/material/TextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { post } from "../helper/apiHelper";
import { useLocation } from "react-router-dom";
import "../css/start.css";

const validationSchema = Yup.object().shape({
  contactNo: Yup.string().required("Required"),
  password: Yup.number().required("Required"),
});

const Login = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const returnLink = searchParams?.get("return");
  const [errorTxt, setErrorTxt] = React.useState(null);
  const [loadding, SetLoading] = React.useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    setErrorTxt(null);
    SetLoading(true);
    const div = {
      contactNumber: values?.contactNo && values?.contactNo.toString(),
      password: values?.password,
    };
    const response = await post("/auth/loginWithPassword", div);
    if (response) {
      if (response?.status === 200) {
        localStorage.setItem("x-service-token", response?.data?.token);
        const userData = JSON.stringify(response?.data?.data);
        console.log("userData---->", userData);
        localStorage.setItem("x-user-data", userData);

        setTimeout(() => {
          if (returnLink) {
            // window.location.href = returnLink;
            if (
              response?.data?.roles[0] &&
              response?.data?.roles[0] === "Admin"
            ) {
              window.location.href = "#/admin/users";
            } else {
              window.location.href = "#/home";
            }
          } else {
            if (
              response?.data?.roles[0] &&
              response?.data?.roles[0] === "Admin"
            ) {
              window.location.href = "#/admin/users";
            } else {
              window.location.href = "#/home";
            }
          }
          SetLoading(false);
        }, 1000);
      } else if (response?.status === 403 || response?.status === 404) {
        // swal("Sorry!", response?.message, "warning");
        setErrorTxt(response?.message);
        SetLoading(false);
      } else {
        // swal("Error!", response?.message, "error");
        setErrorTxt(response?.message);
        SetLoading(false);
      }
    }
    console.log("response------->", response);
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="main container">
        <div className="welcome">
          <h6>Welcome To</h6>
        </div>
        <div className="Security">
          <h1>The Alipore Museum</h1>
        </div>
        <div className="lorem">
          <h6>The heritage sites of Kolkata. Constructed in 1906</h6>
        </div>
        <center>
          {errorTxt && (
            <b
              style={{
                color: "#ad0004",
                textTransform: "capitalize",
              }}
            >
              {errorTxt}
            </b>
          )}
        </center>
        <div
          className="form container px-0"
          style={{ boxShadow: "none", background: "none" }}
        >
          <Formik
            initialValues={{ contactNo: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form>
                <div className="form-group mb-4">
                  <input
                    type="number"
                    name="contactNo"
                    className="form-control icon-input input-email"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Contact No"
                    as={TextField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contactNo}
                    error={touched.contactNo && Boolean(errors.contactNo)}
                    inputMode="numeric"
                  />
                  <ErrorMessage name="contactNo" />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="password"
                    className="form-control icon-input input-password"
                    id="exampleInputPassword1"
                    placeholder="PIN"
                    as={TextField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    name="password"
                    inputMode="numeric"
                  />
                  <ErrorMessage name="password" />
                </div>

                {!loadding ? (
                  <div
                    className="login-button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    <button type="button" className="btn" style={{ margin: 0 }}>
                      <div className="text">
                        <h6>{window.site_text("pages.landing.sign_in")}</h6>
                      </div>
                    </button>
                  </div>
                ) : (
                  <center>
                    <div className="loader"></div>
                    <br />
                  </center>
                )}
              </Form>
            )}
          </Formik>
          {/* 
          <div className="_container">
            <div className="row form_toggle">
              <div className="col">
                <div className="form-chec form-switch switch">
                  <input className="form-check-input " type="checkbox" />
                  <p className="ml-4">&nbsp;&nbsp;&nbsp; Remember Me</p>
                </div>
              </div>
              <div className="col">
                <p>Forgot Password?</p>
              </div>
            </div>
          </div> */}
        </div>
        <div
          className="register mt-3"
          onClick={() => (window.location.href = "#/register")}
        >
          <p>Not a registered user? </p>
          <strong>CLICK HERE</strong> to register
        </div>
      </div>
    </div>
  );
};

export default Login;
