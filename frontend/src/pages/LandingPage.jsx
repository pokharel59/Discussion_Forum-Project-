// pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const bgColor = "#83bdff";


function LandingPage() {
  return (
    <div style={styles.container}>
      <div style={styles.main}>
        
        {/* top section */}
        <div style={styles.top}>
          <div style={styles.logo}>DiscussionForum</div>
          <div style={styles.center}>
            <Link to="/login">
              <button style={styles.button}>
                <i className="bi bi-plus-circle-dotted" style={styles.icon}></i>Create Lobby
              </button>
            </Link>
          </div>
          <div style={styles.right}>
            <Link to="/login" style={styles.link}><button style={styles.button}>Login</button></Link>
            <Link to="/register" style={styles.link}><button style={styles.button}>Register</button></Link>
          </div>
        </div>

        {/* bottom section */}
        <div style={styles.bottom}>
          <div style={styles.row1}>Take Turns. Share Ideas. Make Decisions.</div>
          <div style={styles.row2}>
            Create private discussion rooms where participants speak one at a time,<br/>
            vote on opinions, and track responses easily.
          </div>
          <div style={styles.row3}>
            <Link to="/login">
              <button style={{...styles.button, ...styles.start}}>Start a Discussion</button>
            </Link>
            <Link to="/join-lobby" style={styles.link}>
              <button style={{...styles.button, ...styles.join}}>Join with Code</button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

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
    width: "1200px", // Fixed width
    height: "800px", // Fixed height
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  top: {
    backgroundColor: bgColor,
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
  },
  icon: {
    marginRight: "10px",  // Adds space between the icon and text
    fontSize: "20px", // Adjust the icon size if needed
    fontWeight: "bold",
    verticalAlign: "middle",
  },
  bottom: {
    backgroundColor: "#fff",
    flex: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  row1: {
    fontSize: "50px",
    fontWeight: "bold",
    color: "#000",
    marginBottom: "50px",
  },
  row2: {
    fontSize: "24px",
    color: "#000",
    marginBottom: "50px",
    textAlign: "center"
  },
  row3: {
    display: "flex",
    gap: "150px",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "26px",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // flex: 1,
  },
  right: {
    display: "flex",
    gap: "20px",
  },
  button: {
    backgroundColor: "#005cc4",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "20px"
  },
  start: {
    backgroundColor: "lightgreen",
    color: "black",
  },
  join: {
    backgroundColor: "#e0e0e0",
    color: "black",
  },
  link: {
    textDecoration: "none",
  }
};

export default LandingPage;
