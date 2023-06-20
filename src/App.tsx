import React, { useContext } from "react";
import EditorPage from "./pages/EditorPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext.tsx";

function App() {
  const authCtx = useContext(AuthContext);

  const AuthProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => (
    <>{authCtx?.logedUser?.token ? children : <Navigate to={"/login"} />}</>
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProtectedRoute>
              <EditorPage />
            </AuthProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
