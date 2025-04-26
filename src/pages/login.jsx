import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const LoginPage = () => {
  const { user, login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login();
      navigate("/testprofile");
    } catch (error) {
      if (error.message.includes("Northwestern email")) {
        console.error("Please use a Northwestern email to login");
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/testprofile");
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to Ignite -- Northwestern Garage Job Matching Website
      </h1>
      <button
        onClick={handleLogin}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
