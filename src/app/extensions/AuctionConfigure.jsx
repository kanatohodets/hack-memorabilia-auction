import React, { useState } from 'react';
import {
  Divider,
  Link,
  Button,
  Text,
  Input,
  Stack,
  DateInput,
  NumberInput,
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
  const [minBids, setMinBids] = useState(0);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Call serverless function to execute with parameters.
  // The name `myFunc` as per configurations inside `serverless.json`

  const createAuction = () => {
    runServerless({ name: 'auction-configure', propertiesToSend: ['hs_object_id'], parameters: { minBids: minBids, startTime: startTime, endTime: endTime } }).then((resp) => {
      console.log(resp);
      sendAlert({ message: resp.response })
    });
  };

  return (
    <>
      <Text>
        <Text format={{ fontWeight: 'bold' }}>
          Create an auction for this item
        </Text>
      </Text>
      <Stack>
        <DateInput
          name="start-time"
          label="Auction Start"
          description="Auction Start Time"
          onInput={(t) => {
            console.log("START TIME", t);
            setStartTime(t)
          }}
        />

        <DateInput
          name="end-time"
          label="Auction End"
          description="Auction End Time"
          onInput={(t) => setEndTime(t)}
        />

        <NumberInput
          name="min-bid-count"
          label="Minimum bid count"
          description="Minimum bids required for auction to close"
          value="0"
          onInput={(t) => setMinBids(t)}
        />

        <Button type="submit" onClick={createAuction}>
          Create new Auction
        </Button>
      </Stack>
    </>
  );
};
