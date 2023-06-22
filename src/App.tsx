import React, { useContext, useEffect } from "react";
import EditorPage from "./pages/EditorPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import TesterPage from "./pages/TesterPage.tsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext.tsx";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/test" element={<TesterPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
