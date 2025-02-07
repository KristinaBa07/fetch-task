import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./views/pages/LoginPage";
import DogSearchPage from "./views/pages/DogSearchPage";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
          <Route
              path="/"
              element={ <DogSearchPage /> }
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
