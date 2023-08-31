import React, { useState, useEffect } from 'react';
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
} from "@hubspot/ui-extensions";

// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
  />
));

let init = false;

// Define the Extension component, taking in runServerless, context, & sendAlert as props
const Extension = ({ context, runServerless, sendAlert }) => {
  const [minBids, setMinBids] = useState(0);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    if (!init) {
      runServerless({ name: 'get-auctions-for-item', propertiesToSend: ['hs_object_id'], parameters: {} }).then((res) => {
        setAuctions(res.response.map((r) => { return { id: r.id, name: r.properties.name }}));
      });
      init = true;
    }
  }, [])

  const createAuction = () => {
    runServerless({ name: 'auction-configure', propertiesToSend: ['hs_object_id'], parameters: { minBids: minBids, startTime: startTime, endTime: endTime } }).then((resp) => {
      console.log(resp);
      sendAlert({ message: resp.response });
    });
  };

  return (
    <>
    { auctions.length == 0 ?
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
    : <Text> WHAT This item already has an active auction: {JSON.stringify(auctions)} </Text> }
    </>
  );
};
