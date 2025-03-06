import React from "react";
import { Link } from "react-router-dom";

const bgColor = "#83bdff";

function LobbyPage() {
  return (
    <div style={styles.container}>
      <div style={styles.main}>
        
        {/* top section */}
        <div style={styles.top}>
          <div style={styles.topText}>Create Discussion Lobby</div>
        </div>

        {/* bottom section */}
        <div style={styles.bottom}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Discussion Topic</label>
            <input type="text" placeholder="Enter the main topic" style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Timer per turn</label>
            <select style={styles.input}>
              <option value="3">3 minutes</option>
              <option value="5">5 minutes</option>
              <option value="7">7 minutes</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Room ID</label>
            <input type="text" placeholder="Default room id" style={styles.input} />
          </div>

        {/* buttons */}
        <div style={styles.buttonRow}>
          <Link to="/home">
            <button style={styles.button1}>Back</button>
          </Link>
          <Link to="/waiting-room">
            <button style={styles.button2}>Create Lobby</button>
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
    alignItems: "flex-start",
    paddingLeft: "140px", // Added left padding
    paddingTop: "40px",
  },
  formGroup: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  input: {
    width: "400px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  buttonRow: {
    width: "400px",
    display: "flex",
    justifyContent: "space-between",
  },
  button1: {
    backgroundColor: "#0099e6",
    color: "white",
    border: "none",
    padding: "4px 30px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "20px"
  },
  button2: {
    backgroundColor: "#d2d2d2",
    color: "black",
    border: "none",
    padding: "4px 30px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "20px"
  },
};

export default LobbyPage;
