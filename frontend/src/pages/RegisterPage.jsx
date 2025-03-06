// RegisterPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const bgColor = "#83bdff";

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // submit event
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Username:", username, "Email:", email, "Password:", password, "Confirm Password:", confirmPassword);
    alert("Registered Successfully");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        {/* Left div */}
        <div style={styles.leftDiv}>
          <h2 style={styles.heading}>Already have an account?</h2>
          <h3 style={styles.subHeadingRight}>
            Login now and explore amazing travel experiences.
          </h3>
          <Link to="/login" style={styles.loginButton}>
            Login
          </Link>
        </div>

        {/* Right div (Register form with background color) */}
        <div style={styles.rightDiv}>
          <h2 style={styles.heading}>Register</h2>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              style={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            
            <button type="submit" style={styles.registerButton}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#e2e2e2",
  },
  main: {
    width: "1200px",
    height: "800px",
    display: "flex",
    flexDirection: "row", // Default row layout
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  leftDiv: {
    width: "50%",
    height: "100%",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "100px",
  },
  rightDiv: {
    width: "50%",
    height: "100%",
    backgroundColor: bgColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "100px",
    color: "white",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "40px",
    marginTop: "-40px",
    textAlign: "center",
    color: "black",
  },
  subHeadingRight: {
    textAlign: "center",
    color: "#111",
    fontSize: "18px",
    marginBottom: "60px",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: "18px",
    marginBottom: "5px",
    color: '#000',
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "30px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  registerButton: {
    padding: "6px 40px",
    backgroundColor: "seagreen",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
    marginTop: "40px",
    marginLeft: "130px",
    textAlign: "center",
    display: "inline-block",
  },
  loginButton: {
    marginTop: "20px",
    padding: "6px 40px",
    backgroundColor: "#444",
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
    textAlign: "center",
    display: "inline-block",
    
  },
};

export default RegisterPage;
