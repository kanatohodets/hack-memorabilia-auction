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
  const [text, setText] = useState('');

  // Call serverless function to execute with parameters.
  // The name `myFunc` as per configurations inside `serverless.json`

  const submitBid = () => {
    runServerless({ name: 'statGenerator', propertiesToSend: ['hs_object_id'], parameters: { text: text } }).then((resp) => {
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
        <Input name="text" label="Bid" onInput={(t) => setText(t)} />
        <Button type="submit" onClick={submitBid}>
          Click me
        </Button>
      </Stack>
    </>
  );
};
