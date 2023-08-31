import React, { useState, useEffect } from "react";
import {
  Divider,
  Link,
  Button,
  Text,
  Input,
  DateInput,
  LoadingSpinner,
  NumberInput,
  Tile,
  Flex,
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
  const [loading, setLoading] = useState(true);
  const [activeAuctions, setActiveAuctions] = useState([]);

  const [minBids, setMinBids] = useState(0);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [startHour, setStartHour] = useState(0);
  const [startMin, setStartMin] = useState(0);

  const [endHour, setEndHour] = useState(0);
  const [endMin, setEndMin] = useState(0);

  useEffect(() => {
    if (loading) {
      runServerless({
        name: "get-auctions-for-item",
        propertiesToSend: ["hs_object_id"],
        parameters: {},
      }).then((res) => {
        setActiveAuctions(
          res.response
            .filter((r) => {
              return r.properties.state == "active";
            })
            .map((r) => {
              return {
                id: r.id,
                name: r.properties.name,
                state: r.properties.state,
                end_time: r.properties.end_time,
              };
            }),
        );
        setLoading(false);
      });
    }
  }, [loading]);

  const createAuction = () => {
    let start = {
      date: startDate,
      hour: startHour,
      min: startMin,
    };

    let end = {
      date: endDate,
      hour: endHour,
      min: endMin,
    };

    runServerless({
      name: "auction-configure",
      propertiesToSend: ["hs_object_id"],
      parameters: { minBids: minBids, start: start, end: end },
    }).then((resp) => {
      console.log(resp);
      sendAlert({ message: resp.response });
    });
  };

  let load = () => {
    return <LoadingSpinner label="Loading..." />;
  };

  let create = () => {
    if (activeAuctions.length > 0) {
      return (
        <Text>
          There's already an active auction for this item:{" "}
          {JSON.stringify(activeAuctions)}
        </Text>
      );
    }

    return (
      <>
        <Flex direction={"row"} justify={"start"}>
          <Tile>
            <DateInput
              name="start-date"
              label="Start date"
              onChange={(t) => setStartDate(t)}
            />
          </Tile>

          <Tile>
            <NumberInput
              name="start-hour"
              label="Hour"
              value={startHour}
              onChange={(t) => setStartHour(t)}
              min="0"
              max="23"
            />
          </Tile>
          <Tile>
            <NumberInput
              name="start-min"
              label="Minute"
              value={startMin}
              onChange={(t) => setStartMin(t)}
              min="0"
              max="59"
            />
          </Tile>
        </Flex>

        <Flex direction={"row"} justify={"start"}>
          <Tile>
            <DateInput
              name="end-time"
              label="End date"
              onChange={(t) => setEndDate(t)}
            />
          </Tile>
          <Tile>
            <NumberInput
              name="end-hour"
              label="Hour"
              value={endHour}
              onChange={(t) => setEndHour(t)}
              min="0"
              max="23"
            />
          </Tile>
          <Tile>
            <NumberInput
              name="end-min"
              label="Minute"
              value={endMin}
              onChange={(t) => setEndMin(t)}
              min="0"
              max="59"
            />
          </Tile>
        </Flex>

        <NumberInput
          name="min-bid-count"
          label="Minimum bid count"
          description="Minimum bids required for auction to close"
          value={minBids}
          onChange={(t) => setMinBids(t)}
        />

        <Button type="submit" onClick={createAuction}>
          Create new Auction
        </Button>
      </>
    );
  };

  return <>{loading ? load() : create()}</>;
};
