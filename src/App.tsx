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
import { AppContextProvider } from "./contexts/AppContext.tsx";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route index element={<Navigate to={"/editor"} />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/test" element={<TesterPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    </AppContextProvider>
  );
}

export default App;
