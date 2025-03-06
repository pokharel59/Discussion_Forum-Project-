// pages/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const bgColor = "#83bdff";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // submit event
  function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload
    console.log("Email:", email, "Password:", password);
    alert("Login Successful");
    // Add login logic here (e.g., API call)
    navigate("/home");
  };

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        {/* left div */}
        <div style={styles.leftDiv}>
          <h2 style={styles.heading}>Login to Your Account</h2>
          <h5 style={styles.subHeading}>
            Login to your account so you can enter<br /> discussion system
          </h5>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
            <div style={styles.forgotPassword}>Forgot password?</div>
            <button type="submit" style={styles.loginButton}>
              Login
            </button>
          </form>
        </div>

        {/* right div */}
        <div style={styles.rightDiv}>
          <h2 style={styles.heading}>Don't have an Account Yet?</h2>
          <h3 style={styles.subHeadingRight}>
            Let's get you all set up so you can start creating your first <br /> onboarding experiences.
          </h3>
          <Link to="/register" style={styles.registerButton}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

// styles
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
    flexDirection: "row",
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
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "40px",
    textAlign: "center",
    color: "black",
  },
  subHeading: {
    fontSize: "18px",
    color: "#111",
    marginBottom: "30px",
    textAlign: "center",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: "18px",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "40px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    fontSize: "16px",
    color: "#007bff",
    cursor: "pointer",
    marginTop: "-34px",
    marginBottom: "30px",
    marginLeft: "270px",
  },
  loginButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "lightseagreen",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
  },
  rightDiv: {
    width: "50%",
    height: "100%",
    backgroundColor: bgColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "70px",
    paddingTop: "176px",
    color: "white",
  },
  registerButton: {
    marginTop: "20px",
    padding: "6px 40px",
    backgroundColor: "#fff",
    color: "#111",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
    textAlign: "center",
    display: "inline-block",
  },
  subHeadingRight: {
    textAlign: "center",
    color: "#fff",
    fontSize: "18px",
    marginBottom: "60px",
  }
};

export default LoginPage;
