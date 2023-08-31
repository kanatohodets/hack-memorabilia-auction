import React, { useEffect, useState } from "react";
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
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    getAuctionTime();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((timeRemaining) => timeRemaining - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeRemaining]);

  // Call serverless function to execute with parameters.
  // The name `myFunc` as per configurations inside `serverless.json`

  const getAuctionTime = () => {
    runServerless({
      name: "auctionTime",
      propertiesToSend: ["hs_object_id", "end_time"],
      parameters: {},
    }).then((resp) => {
      console.log(resp);
      setTimeRemaining(resp.response);
    });
  };

  return (
    <>
      <Text>
        <Text format={{ fontWeight: "bold" }}>
          Auction off some baseball history!
        </Text>
        <Text format={{ fontWeight: "bold" }}>
          Time Remaining: {new Date(timeRemaining * 1000).toISOString().slice(11, 19)}
        </Text>
      </Text>
    </>
  );
};
