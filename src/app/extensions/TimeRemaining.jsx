import React, { useEffect, useState } from "react";
import { Text } from "@hubspot/ui-extensions";

const TimeRemaining = ({ runServerless }) => {
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

  const getAuctionTime = () => {
    runServerless({
      name: "auctionTime",
      propertiesToSend: ["hs_object_id", "end_time"],
      parameters: {},
    }).then((resp) => {
      setTimeRemaining(resp.response);
    });
  };

  return (
    <Text format={{ fontWeight: "bold" }}>
      Time Remaining:{" "}
      {new Date(timeRemaining * 1000).toISOString().slice(11, 19)}
    </Text>
  );
};

export default TimeRemaining;
