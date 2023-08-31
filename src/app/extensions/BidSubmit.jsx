import React, { useState } from "react";
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
  console.log(context.user.id);
  const [bid, sendBid] = useState(0);

  console.log(bid);

  // Call serverless function to execute with parameters.
  // The name `myFunc` as per configurations inside `serverless.json`

  // pass in state in properties to send
  const submitBid = () => {
    runServerless({
      name: "submitBid",
      propertiesToSend: ["start_time", "end_time", "hs_object_id"],
      parameters: { bid: bid, userId: context.user.id },
    }).then((resp) => {
      console.log(resp);
      sendAlert({ message: resp.response });
    });
  };

  return (
    <>
      <Text>
        <Text format={{ fontWeight: "bold" }}>
          Enter your highest current bid for this item.
        </Text>
      </Text>
      <Stack>
        <Input name="text" label="Bid" onInput={(t) => sendBid(t)} />
        <Button type="submit" onClick={submitBid}>
          Submit
        </Button>
      </Stack>
    </>
  );
};
