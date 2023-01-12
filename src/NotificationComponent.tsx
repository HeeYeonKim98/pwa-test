import React from "react";

const NotificationComponent = () => {
  const displayNotification = () => {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.getRegistration().then(function (reg: any) {
        reg.showNotification("ROA TEST");
      });
    }
  };
  return <button onClick={displayNotification}> Send notification </button>;
};

export default NotificationComponent;
