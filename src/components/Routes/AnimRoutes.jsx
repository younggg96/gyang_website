import React from "react";
// import pages
import Home from "../../pages/HomePage";
import Auth from "../../pages/AuthPage";
import Profile from "../../pages/ProfilePage";
import ArticlePage from "../../pages/ArticlePage";
import ErrorPage from "../../pages/ErrorPage";

// import routes route & useLocation hook
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NewArticlePage from "../../pages/NewArticlePage";

const AnimRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence initial={true}>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile/my-profile" element={<Profile self={true} />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/article/new" element={<NewArticlePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimRoutes;
