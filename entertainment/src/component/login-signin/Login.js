import React, { useState, useEffect } from "react";
import "./profileloginlogout.css";
import { Link } from "react-router-dom";
import { MdMovie } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate is blank

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token and user data in localStorage (or any storage of your choice)
        localStorage.setItem("userInfo", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        console.log("Login successful!", data);
        setError(""); // Clear any previous error messages
        // Redirect to the dashboard or any other page
        navigate("/"); // Navigate to the home page
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {}, [email, password]);

  return (
    <div className="login-component">
      <div className="login-box text-white">
        <div className="text-red-500 mt-8 flex w-full justify-center">
          <MdMovie className="md:w-16 md:h-20 sm:w-10 sm:h-10 w-10 h-10" />
        </div>

        <div className="mt-10 signin-box">
          <div className="flex flex-col gap-4 justify-center ml-4 mr-4">
            <p className="text-3xl mt-2">Login</p>

            <input
              type="text"
              placeholder="Email"
              className="input-lebal"
              onChange={(e) => setEmail(e.target.value)}
              value={email} // Add this line to bind the input to the state
            />
            <input
              type="password"
              placeholder="Password"
              className="input-lebal"
              onChange={(e) => setPassword(e.target.value)}
              value={password} // Add this line to bind the input to the state
            />
          </div>

          <div className="w-full mt-8 sub-login-box">
            <div>
              <button className="bg-red-400 p-2" onClick={handleLogin}>
                Log in to your account
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
            {/* Display error message */}
            <p className="text-md mt-2 justify-center">
              Don't have an account?
              <Link to="/sign-up">
                <span className="text-red-500"> Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
