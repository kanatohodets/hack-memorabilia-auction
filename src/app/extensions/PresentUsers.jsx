import React, { useEffect, useState } from "react";
import { Text } from "@hubspot/ui-extensions";

// Define the Extension component, taking in runServerless, context, & sendAlert as props
const PresentUsers = ({ context, runServerless }) => {
  const [presentUsers, setPresentUsers] = useState([]);

  const getPresence = () => {
    runServerless({
      name: "getPresence",
      propertiesToSend: ["hs_object_id", "presence"],
      parameters: { userId: context.user.id },
    }).then((res) => {
      setPresentUsers(res.response);
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // establish presence every 5 seconds
      runServerless({
        name: "establishPresence",
        propertiesToSend: ["hs_object_id", "presence"],
        parameters: { userId: context.user.id },
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // get presence every 10 seconds
    const interval = setInterval(getPresence, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getPresence();
  }, []);

  return (
      <Text>Present Users: {presentUsers.join(", ")}</Text>
  );
};

export default PresentUsers;
