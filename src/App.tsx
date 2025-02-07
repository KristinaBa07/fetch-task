import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./views/pages/LoginPage";
import DogSearchPage from "./views/pages/DogSearchPage";

const isAuthenticated = () => {
    return localStorage.getItem("authorized") === "true"
};

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
          <Route
              path="/"
              element={isAuthenticated() ? <DogSearchPage /> :  <Navigate to="/login" />}
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
