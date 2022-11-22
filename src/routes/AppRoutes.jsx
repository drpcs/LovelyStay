import React from "react";
import {Routes, Route} from "react-router-dom";
import Search from "../components/Search";
import View from "../components/View";

function AppRoutes() {
  return (
    <Routes>
        <Route exact path="/" element={<Search />} />}/>
        <Route exact path="view/:username" element={<View />} />}/>
    </Routes>
  );
}

export default AppRoutes;
