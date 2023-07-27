import React, { useEffect } from "react";
// import components
import Header from "./components/header/Header";
// import router
import { BrowserRouter as Router } from "react-router-dom";
import { initTheme } from "./helper/theme";
import AnimRoutes from "./Routes/AnimRoutes";
import "./app.scss";

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
