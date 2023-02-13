import React from "react";
// import pages
import Home from "../../pages/Home";
import Auth from "../../pages/Auth";
import Profile from "../../pages/Profile";

// import routes route & useLocation hook
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ArticlePage from "../../pages/ArticlePage";

const AnimRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence initial={true}>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="*" element={<ArticlePage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimRoutes;
