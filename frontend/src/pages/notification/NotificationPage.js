import React, { useState } from "react";
import "./NotificationPage.css"; // Import the CSS file for styling

function NotificationPage() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "New Order",
            message: "You have a new order to pay.",
        },
        {
            id: 2,
            title: "Order Status Changed",
            message: "Your order is now being delivered.",
        },
        // Add more notifications as needed...
    ]);

    const clearNotification = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    return (
        <div className="notification-container">
            <h1 className="notification-heading">Notifications</h1>
            {notifications.length === 0 ? (
                <p className="no-notification">No new notifications.</p>
            ) : (
                <ul className="notification-list">
                    {notifications.map((notification) => (
                        <li key={notification.id} className="notification">
                            <h3 className="notification-title">{notification.title}</h3>
                            <p className="notification-message">{notification.message}</p>
                            <button
                                className="notification-clear-btn"
                                onClick={() => clearNotification(notification.id)}
                            >
                                Clear
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default NotificationPage;
