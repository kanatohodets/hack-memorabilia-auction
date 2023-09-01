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
import PresentUsers from "./PresentUsers";

// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
    fetchProperties={actions.fetchCrmObjectProperties}
  />
));

// Define the Extension component, taking in runServerless, context, & sendAlert as props
const Extension = ({ context, runServerless, sendAlert, fetchProperties }) => {
  return (
    <>
      <Text>
        <Text format={{ fontWeight: "bold" }}>
          Auction off some baseball history!
        </Text>
        <TimeRemaining runServerless={runServerless} fetchProperties={fetchProperties} />
        <PresentUsers runServerless={runServerless} context={context} />
      </Text>
    </>
  );
};
