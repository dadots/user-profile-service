import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Profile from "@/pages/profile";
import Home from "@/pages/home";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from 'react-toastify';

function App() {
    const [token, setToken] = useState<string | null>(
      localStorage.getItem("token")
    );

    return (
      <>
        <Routes>
            <Route
              path="/login"
              element={
                token ? (
                  <Navigate to="/" />
                ) : (
                  <Login
                    onLogin={(t) => {
                      localStorage.setItem("token", t);
                    }}
                  />
                )
              }
            />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer 
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </>
    );
}

export default App;
