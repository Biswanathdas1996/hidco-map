import * as React from "react";
import { post } from "../../helper/apiHelper";
import { setCookie } from "../../helper/cookies";
import { useLocation } from "react-router-dom";
import AdminLoginView from "../../View/Admin/AdminLogin";

export default function AdminLogin() {
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const searchParams = new URLSearchParams(location.search);
  const returnLink = searchParams?.get("return");

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    const body = { ...values, password: parseInt(values?.password) };

    const response = await post("/auth/loginWithPassword", body);
    // console.log("session", response?.data?.token);
    if (response?.data?.token) {
      localStorage.setItem("x-service-token", response?.data?.token);
      // return;
      // document.cookie = `session=${response?.token}; path=/`;
      setTimeout(() => {
        if (returnLink) {
          window.location.href = returnLink;
        } else {
          window.location.href = "#/admin/users";
        }
        setLoading(false);
      }, 1000);
    } else {
      alert("inavlid admin");
      setLoading(false);
    }
  };

  return <AdminLoginView handleSubmit={handleSubmit} loading={loading} />;
}
