import React, { useEffect } from "react";
// import components
import Header from "./components/header/Header";
// import router
import { BrowserRouter as Router } from "react-router-dom";
import AnimRoutes from "./components/Routes/AnimRoutes";
import "./app.scss";
import { initTheme } from "./helper/theme";

const App = () => {
  useEffect(() => {
    initTheme();
  }, []);

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
