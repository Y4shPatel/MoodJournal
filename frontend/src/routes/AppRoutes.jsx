import { Routes, Route, Navigate } from "react-router-dom";
import authStore from "../stores/authStore";
import { useEffect } from "react";
import Login from "../components/Auth/Login";
import MoodPage from "../components/Mood/MoodPage"; // this will wrap MoodList + Form

const AppRoutes = () => {
  const { loggedIn, checkAuth } = authStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loggedIn === null) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={
          loggedIn ? <Navigate to="/moods" /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/login"
        element={
          loggedIn ? <Navigate to="/moods" /> : <Login />
        }
      />
      <Route
        path="/moods"
        element={
          loggedIn ? <MoodPage /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
