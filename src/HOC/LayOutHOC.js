import React from "react";
import Header from "../LayOut/Header";
import Footer from "../LayOut/Footer";
import UserBAckScreenHeader from "../LayOut/UserBackHeader";
import BackHeader from "../LayOut/BackHeader";

export function AdminLayout(Body) {
  return (
    <>
      <div className="flex-column h-100">
        <div
          className="bg-default"
          style={{ zIndex: 0, height: "10.5rem" }}
        ></div>
        <main className="flex-shrink-0 main-foot-adjust" style={{ zIndex: 1 }}>
          <div className="container pt-5">
            <Header />
            <Body />
          </div>
        </main>
      </div>
    </>
  );
}

export function UserLayout(Body, type) {
  return (
    <>
      {type === "back_button" ? <BackHeader /> : <UserBAckScreenHeader />}
      <Body />

      <Footer />
    </>
  );
}

export function UserHeaderlessLayout(Body) {
  return (
    <>
      <Body />
      {/* <Footer /> */}
    </>
  );
}
