// src/pages/Notifications.jsx
import React from "react";
import { useAppContext } from "../context/AppContext";
import {
  BellRing,
  CheckCircle,
  Info,
  AlarmClock,
} from "lucide-react"; // Lucide icons

const Notifications = () => {
  const { user, notifications } = useAppContext();

  if (!user) {
    return (
      <div className="p-6 text-center text-lg text-gray-600">
        Please log in to view your notifications.
      </div>
    );
  }

  // Get icon and styles by notification type
  const getNotificationStyle = (type) => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle className="text-green-600 mt-1" size={22} />,
          bg: "bg-green-50",
          border: "border-green-500",
          text: "text-green-800",
        };
      case "info":
        return {
          icon: <Info className="text-blue-600 mt-1" size={22} />,
          bg: "bg-blue-50",
          border: "border-blue-500",
          text: "text-blue-900",
        };
      case "reminder":
        return {
          icon: <AlarmClock className="text-orange-500 mt-1" size={22} />,
          bg: "bg-orange-50",
          border: "border-orange-400",
          text: "text-orange-900",
        };
      default:
        return {
          icon: <BellRing className="text-gray-600 mt-1" size={22} />,
          bg: "bg-gray-50",
          border: "border-gray-400",
          text: "text-gray-800",
        };
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-primary mb-8 flex items-center gap-2">
        <BellRing className="text-primary" size={28} />
        Your Notifications
      </h1>

      {notifications.length === 0 ? (
        <div className="text-gray-500 text-center py-12 border rounded-lg bg-gray-50">
          You have no notifications at the moment.
        </div>
      ) : (
        <ul className="space-y-5">
          {notifications.map((notif, index) => {
            const style = getNotificationStyle(notif.type);
            return (
              <li
                key={index}
                className={`flex items-start gap-3 shadow-sm p-4 rounded-lg border-l-4 ${style.bg} ${style.border}`}
              >
                {style.icon}
                <div>
                  <p className={`text-sm font-medium ${style.text}`}>{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notif.date}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
