import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session or token here if needed
    navigate("/");
  };

  return (
    <button onClick={handleLogout} style={styles.logoutButton}>
      Logout
    </button>
  );
}

const styles = {
  logoutButton: {
    fontSize: "20px",
    // fontWeight: "bold",
    backgroundColor: "#d9534f", // Reddish color
    color: "white",
    border: "none",
    display: "inline-block",
    padding: "6px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
};

export default LogoutButton;
