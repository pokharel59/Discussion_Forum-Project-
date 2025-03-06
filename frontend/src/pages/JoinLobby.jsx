import React from "react";
import { Link } from "react-router-dom";

const bgColor = "#83bdff";

function JoinLobby() {
  return (
    <div style={styles.container}>
      <div style={styles.main}>
        
        {/* top section */}
        <div style={styles.top}>
          <div style={styles.topText}>Join Discussion</div>
        </div>

        {/* bottom section */}
        <div style={styles.bottom}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Joining Code</label>
            <input type="text" placeholder="Enter the 6-digit code.." style={styles.input} />
          </div>
          
          <Link to="/waiting-room">
            <button style={styles.button2}>Join Discussion</button>
          </Link>

            <Link to="/home">
              <button style={styles.button1}>Back</button>
            </Link>

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
    width: "1200px",
    height: "800px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  top: {
    backgroundColor: bgColor,
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 140px",
  },
  topText: {
    fontWeight: "bold",
    fontSize: "36px",
    marginTop: "10px",
  },
  bottom: {
    backgroundColor: "#fff",
    flex: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "40px",
  },
  formGroup: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "30px",
    marginTop: "70px",
    textAlign: "center"
  },
  input: {
    width: "400px",
    padding: "10px",
    fontSize: "18px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "60px",
  },
  button1: {
    backgroundColor: "#0099e6",
    color: "white",
    border: "none",
    padding: "4px 30px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "20px",
    alignSelf: "flex-start",
  },
  button2: {
    backgroundColor: "#d2d2d2",
    color: "black",
    border: "none",
    padding: "10px 30px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "20px",
    marginBottom: "150px",
  },
};

export default JoinLobby;
