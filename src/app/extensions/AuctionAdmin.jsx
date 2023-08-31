import React, { useState } from 'react';
import {
  Divider,
  Link,
  Button,
  Text,
  Input,
  Stack,
  hubspot,
} from '@hubspot/ui-extensions';

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


  // Call serverless function to execute with parameters.
  // The name `myFunc` as per configurations inside `serverless.json`

  const getAuctionTime = () => {
    runServerless({ name: 'auctionTime', propertiesToSend: ['hs_object_id'], parameters: { } }).then((resp) => {
      console.log({resp});
      sendAlert({ message: resp.response })
      setTimeRemaining(resp)
    });
  };

  return (
    <>
      <Text>
        <Text format={{ fontWeight: 'bold' }}>
          Auction off some baseball history!
        </Text>
        <Text format={{ fontWeight: 'bold' }}>
          Time Remaining: {timeRemaining}
        </Text>
      </Text>
      <Stack>
        <Input name="text" label="Bid" onInput={(t) => setText(t)} />
        <Button type="submit" onClick={submitBid}>
          Click me
        </Button>
      </Stack>
    </>
  );
};
