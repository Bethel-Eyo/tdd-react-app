import { Snackbar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { notificationService } from "../services/notificationService";

const Notification = () => {
  const [notification, setNotification] = useState({ open: false });

  useEffect(() => {
    const subscription = notificationService.events$.subscribe((notif) =>
      setNotification(notif)
    );
    return () => subscription.unsubscribe();
  }, []);
  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={3000}
      onClose={() => notificationService.close()}
      message={notification.message}
    />
  );
};

export default Notification;
