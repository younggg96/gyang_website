import React from "react";
// import components
import Header from "./components/header/Header";
// import router
import { BrowserRouter as Router } from "react-router-dom";
import AnimRoutes from "./components/Routes/AnimRoutes";
import "./app.scss";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <AnimRoutes />
      </Router>
    </>
  );
};

export default App;
