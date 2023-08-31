import React, { useEffect, useState } from "react";
import TimeRemaining from "./TimeRemaining";
import {
  Divider,
  Link,
  Button,
  Text,
  Input,
  Stack,
  hubspot,
} from "@hubspot/ui-extensions";

// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
  />
));

// Define the Extension component, taking in runServerless, context, & sendAlert as props
const Extension = ({ context, runServerless, sendAlert }) => {
  const [presentUsers, setPresentUsers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // establish presence every 5 seconds
      runServerless({
        name: "establishPresence",
        propertiesToSend: ["hs_object_id", "presence"],
        parameters: {"userId": context.user.id},
      })
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // get presence every 10 seconds
      runServerless({
        name: "getPresence",
        propertiesToSend: ["hs_object_id", "presence"],
        parameters: {"userId": context.user.id},
      }).then(res => {
        console.log({res});
        setPresentUsers(res.response)
      })
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  console.log({presentUsers})
  return (
    <>
      <Text>
        <Text format={{ fontWeight: "bold" }}>
          Auction off some baseball history!
        </Text>
        <TimeRemaining runServerless={runServerless} />
        <Text>Present Users: {presentUsers.join(", ")}</Text>
      </Text>
    </>
  );
};
