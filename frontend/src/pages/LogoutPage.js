import React from "react";

function LogoutPage() {
    const handleLogout = () => {
        // Implement your logout logic here
        console.log("User logged out!");
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Logout</h1>
            <p style={styles.message}>Are you sure you want to log out?</p>
            <button style={styles.logoutButton} onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default LogoutPage;

const styles = {
    container: {
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        borderRadius: "8px",
    },
    heading: {
        textAlign: "center",
        color: "#333",
        marginBottom: "20px",
    },
    message: {
        textAlign: "center",
        color: "#555",
        marginBottom: "30px",
    },
    logoutButton: {
        backgroundColor: "#dc3545",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
    },
};
