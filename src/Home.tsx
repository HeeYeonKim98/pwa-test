import NotificationComponent from "./NotificationComponent";
import React from "react";

const Home = () => {
  Notification.requestPermission((status: NotificationPermission) => {
    console.log("Notification permission status:", status);
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((reg: ServiceWorkerRegistration) => {
      reg.pushManager
        .subscribe({
          userVisibleOnly: true,
        })
        .then(function (sub) {
          console.log("Endpoint URL: ", sub.endpoint);
        })
        .catch(function (e) {
          if (Notification.permission === "denied") {
            console.warn("Permission for notifications was denied");
          } else {
            console.error("Unable to subscribe to push", e);
          }
        });
    });
  }

  return (
    <div>
      <h1>PWA TEST</h1>
      <h2>Trigger Button</h2>
      <NotificationComponent />
    </div>
  );
};

export default Home;
