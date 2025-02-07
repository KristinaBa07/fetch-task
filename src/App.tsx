import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./views/pages/LoginPage";
import DogSearchPage from "./views/pages/DogSearchPage";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
          <Route
              path="/dogs"
              element={ <DogSearchPage /> }
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
