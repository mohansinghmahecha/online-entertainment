import React, { useEffect, useState } from "react";
import { MdMovie } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export default function Logout() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [fullname, setFullName] = useState("");
  const [confirmfullname, setConfirmFullName] = useState(true);
  const navigate = useNavigate();

  const nametyped = (e) => {
    setFullName(e.target.value);
    const nameregux = /^[a-zA-Z\s]+$/; // Regex to allow only letters and spaces
    setConfirmFullName(nameregux.test(e.target.value));
  };

  const emailtypeddata = (e) => {
    setEmail(e.target.value);
    const emailRegex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/; // Simple email validation regex
    setIsEmailValid(emailRegex.test(e.target.value));
  };

  const passwordtypedData = (e) => {
    setPassword(e.target.value);
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; // Regex to check for at least one special character
    const isPasswordValid =
      e.target.value.length >= 6 && specialCharRegex.test(e.target.value);
    setIsPasswordMatch(isPasswordValid && e.target.value === confirmPassword);
  };

  const typedconfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setIsPasswordMatch(password === e.target.value);
  };

  const handleonSumit = async (e) => {
    e.preventDefault();

    if (!isEmailValid || !isPasswordMatch || !confirmfullname) {
      alert("Please correct the errors before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullname,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Clear input fields
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        // Navigate to login page
        navigate("/login");
      } else {
        alert(data.message || "Failed to register");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {}, [isEmailValid, isPasswordMatch]);

  return (
    <div className="signup-container">
      <div className="flex justify-center">
        <MdMovie className="movie-logo text-red-500" />
      </div>

      <div className="signup-main-box">
        <div className="sub-box">
          <p className="text-3xl mb-4 text-start">Sign Up</p>

          <input
            type="text"
            className="signup-input-lebal"
            placeholder="Full Name"
            required
            value={fullname}
            onChange={nametyped}
          />
          <small
            id=""
            className={`text-red-500 p-2 ${confirmfullname ? "hidden" : ""}`}
          >
            Write a valid full name
          </small>

          <input
            type="email"
            className="signup-input-lebal"
            placeholder="Email Address"
            value={email}
            onChange={emailtypeddata}
          />
          <small
            id="emailadressid"
            className={`text-red-500 p-2 ${isEmailValid ? "hidden" : ""}`}
          >
            Write a valid email
          </small>

          <input
            type="password"
            className="signup-input-lebal"
            placeholder="Password"
            value={password}
            onChange={passwordtypedData}
          />
          <input
            type="password"
            className="signup-input-lebal"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={typedconfirmPassword}
          />
          <small
            id="passwordmatchid"
            className={`text-red-500 p-2 ${isPasswordMatch ? "hidden" : ""}`}
          >
            Passwords must match and be at least 6 characters long with 1
            special character
          </small>
        </div>

        <div className="text-center flex flex-col items-center">
          <button id="signup-button" className="p-4" onClick={handleonSumit}>
            Create An Account
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login">
              <span>Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
