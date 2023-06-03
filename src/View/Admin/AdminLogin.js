import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.number().required("Required"),
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AdminLoginView = ({ handleSubmit, loading }) => {
  const [errorTxt, setErrorTxt] = React.useState(null);

  return (
    <>
      <div className="d-flex flex-column h-100">
        <div className="main container">
          <div className="welcome">
            <h6>Welcome To</h6>
          </div>
          <div className="Security">
            <h1>Security Surveillance System Admin</h1>
          </div>
          <div className="lorem">
            <h6>Next generation security surveillance...</h6>
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
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
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
                      type="email"
                      name="email"
                      className="form-control icon-input input-email"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Email"
                      as={TextField}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      error={touched.email && Boolean(errors.email)}
                    />
                    <ErrorMessage name="email" />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="password"
                      className="form-control icon-input input-password"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      as={TextField}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      error={touched.password && Boolean(errors.password)}
                      name="password"
                    />
                    <ErrorMessage name="password" />
                  </div>

                  {!loading ? (
                    <div
                      className="login-button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      <button type="button" className="btn">
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
            onClick={() => (window.location.href = "#/")}
          >
            <p>Not an Admin? </p>
            <strong>CLICK HERE</strong> to go to user portal
          </div>
        </div>
      </div>
      {/* <Box sx={{ flexGrow: 1 }} style={{ marginTop: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div
              style={{ margin: 31, border: "1px solid #ad0004", padding: 20 }}
            >
              <center>
                <h1>Admin Sign in</h1>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form>
                      <Field
                        name="email"
                        type="email"
                        as={TextField}
                        label="Email"
                        variant="outlined"
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        style={{ marginTop: 20 }}
                      />
                      <br />

                      <Field
                        name="password"
                        type="password"
                        as={TextField}
                        label="Password"
                        variant="outlined"
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        style={{ marginTop: 20 }}
                      />
                      <br />

                      <div
                        className="login-button"
                        style={{ marginTop: "2rem" }}
                      >
                        <button className="btn" type="submit">
                          <div className="text">
                            <h6>{loading ? "Authenticating.." : "Login"}</h6>
                          </div>
                        </button>
                      </div>

                      {errors.submit && <div>{errors.submit}</div>}
                    </Form>
                  )}
                </Formik>
              </center>
            </div>
          </Grid>
        </Grid>
      </Box> */}
    </>
  );
};

export default AdminLoginView;
